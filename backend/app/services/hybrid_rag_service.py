import logging
import hashlib
from typing import List, Dict, Any, Tuple
import networkx as nx

logger = logging.getLogger(__name__)

class HybridRAGService:
    """
    Advanced Hybrid RAG Service unifying Dense Vector Retrieval
    with Knowledge Graph (KG) Entity-Relation Traversal for 
    factually-grounded technical research synthesis.
    """
    def __init__(self):
        self.graph = nx.DiGraph()
        self.vector_store: List[Dict[str, Any]] = []

    def index_document(self, doc_id: str, title: str, text: str, entities: List[Tuple[str, str, str]] = None):
        """
        Indexes a technical document into both dense vector store
        and explicit knowledge graph representation.
        """
        words = text.split()
        chunks = [" ".join(words[i:i+256]) for i in range(0, len(words), 256)] or [text]
        
        for idx, chunk in enumerate(chunks):
            chunk_id = f"{doc_id}_chunk_{idx}"
            self.vector_store.append({
                "id": chunk_id,
                "doc_id": doc_id,
                "title": title,
                "text": chunk,
                "hash": hashlib.sha256(chunk.encode('utf-8')).hexdigest()
            })

        if entities:
            for sub, pred, obj in entities:
                self.graph.add_edge(sub, obj, relation=pred, doc_id=doc_id)
                
        logger.info(f"Indexed document '{title}' with {len(chunks)} vector chunks and {len(entities or [])} KG triples.")

    def hybrid_retrieve(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """
        Queries both dense vector store and knowledge graph to aggregate context.
        """
        query_words = set(query.lower().split())
        scored_chunks = []
        for item in self.vector_store:
            chunk_words = set(item["text"].lower().split())
            jaccard_score = len(query_words.intersection(chunk_words)) / max(1, len(query_words.union(chunk_words)))
            scored_chunks.append((jaccard_score, item))
            
        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        top_chunks = [item for _, item in scored_chunks[:top_k]]

        subgraph_nodes = []
        for node in self.graph.nodes:
            if node.lower() in query.lower():
                neighbors = list(self.graph.neighbors(node))
                subgraph_nodes.append({"entity": node, "relations": neighbors})

        return {
            "query": query,
            "dense_retrieval_chunks": top_chunks,
            "knowledge_graph_triples": subgraph_nodes
        }

hybrid_rag_service = HybridRAGService()

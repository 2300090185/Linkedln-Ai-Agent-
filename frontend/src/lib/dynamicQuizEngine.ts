export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  xp_reward: number;
}

export function generateDynamic2hQuizBatch(cycleNumber: number): QuizQuestion[] {
  const seed = (cycleNumber - 1) % 3;

  if (seed === 0) {
    // Cycle 1 Questions based on Llama 3.3, Keras 3, Claude 3.5, OpenAI Swarms & Gemini 2.5
    return [
      {
        id: `q-1-1`,
        topic: "Meta Llama 3.3 & Quantization",
        question: "What primary benefit does sub-100ms model quantization provide for edge RAG deployments?",
        options: [
          "Eliminates the need for vector embeddings completely",
          "Dramatically reduces memory bandwidth & latency on client devices",
          "Increases model parameter size by 400%",
          "Replaces PostgreSQL with SQLite databases"
        ],
        correct_index: 1,
        explanation: "Quantization reduces precision (e.g. FP16 to INT8/INT4), shrinking RAM requirements and accelerating memory bandwidth bound matrix multiplication on edge devices.",
        xp_reward: 100
      },
      {
        id: `q-1-2`,
        topic: "Keras 3 & Framework Agnosticism",
        question: "According to Francois Chollet, why is framework-agnostic tensor compilation advantageous for engineering teams?",
        options: [
          "It forces all model code to run inside web browsers",
          "It prevents vendor lock-in by compiling PyTorch, JAX, and TensorFlow computational graphs into unified C++ kernels",
          "It disables GPU acceleration to save electricity",
          "It requires writing raw assembly code for deep learning models"
        ],
        correct_index: 1,
        explanation: "Unified graph representation in Keras 3 allows switching between PyTorch, JAX, and TensorFlow backends without refactoring core neural network logic.",
        xp_reward: 100
      },
      {
        id: `q-1-3`,
        topic: "OpenAI Swarm Protocol & Agentic State",
        question: "Why do decoupled micro-agent state machines outperform monolithic prompts in high-throughput enterprise pipelines?",
        options: [
          "Monolithic prompts consume 10x less context tokens",
          "Decoupled micro-agents break tasks into specialized steps, preventing context degradation and allowing isolated error recovery loops",
          "Decoupled agents execute sequentially on a single thread",
          "Monolithic prompts guarantee 100% zero-hallucination outputs"
        ],
        correct_index: 1,
        explanation: "By isolating step execution (Ingestion → Analysis → Fact Check), state handoffs remain explicit and granular error recovery prevents cascade failures.",
        xp_reward: 100
      },
      {
        id: `q-1-4`,
        topic: "Gemini 2.5 Flash & Latency",
        question: "What architectural optimization achieved a 45% inference latency reduction on Gemini 2.5 infrastructure?",
        options: [
          "Native token compilation and non-blocking asynchronous event loops",
          "Disabling attention layers during text generation",
          "Storing model weights in text files",
          "Using CPU-only servers without network cards"
        ],
        correct_index: 0,
        explanation: "Asynchronous stream execution paired with native token graph compilation minimizes token latency down to sub-100ms response windows.",
        xp_reward: 100
      },
      {
        id: `q-1-5`,
        topic: "Supabase HNSW pgvector 0.7",
        question: "What similarity query latency bound is achieved by HNSW pgvector 0.7 over 100M+ high-dimensional embeddings?",
        options: [
          "Sub-10ms query speeds",
          "15 to 30 seconds per query",
          "5 minutes query latency",
          "Requires offline manual indexing"
        ],
        correct_index: 0,
        explanation: "Hierarchical Navigable Small World (HNSW) graph indexing enables logarithmic sub-10ms approximate nearest neighbor retrieval directly inside PostgreSQL.",
        xp_reward: 100
      }
    ];
  } else if (seed === 1) {
    // Cycle 2 Questions based on DeepSeek R1, DiskANN, PyTorch FSDP & Free-Threaded Python 3.13
    return [
      {
        id: `q-2-1`,
        topic: "DeepSeek R1 MoE Architecture",
        question: "How does sparse Mixture-of-Experts (MoE) routing improve computational efficiency during multi-step reasoning?",
        options: [
          "It activates only a fraction of total model parameters (experts) for each token pass",
          "It duplicates every parameter 10 times across all GPUs",
          "It converts text tokens into audio waveforms",
          "It removes all hidden layers from the neural network"
        ],
        correct_index: 0,
        explanation: "MoE gating routes input tokens dynamically to relevant expert sub-networks, achieving massive model capacity with low compute overhead per token.",
        xp_reward: 100
      },
      {
        id: `q-2-2`,
        topic: "Microsoft DiskANN Vector Search",
        question: "Where does DiskANN store the bulk of billion-scale vector indexes to lower cloud RAM costs?",
        options: [
          "Directly on high-speed NVMe Solid State Drives (SSDs)",
          "In floppy disks",
          "In browser localStorage",
          "On magnetic tape backups"
        ],
        correct_index: 0,
        explanation: "DiskANN uses compressed graph representations in RAM while fetching full vector representations asynchronously from fast NVMe SSD storage.",
        xp_reward: 100
      },
      {
        id: `q-2-3`,
        topic: "PyTorch Core FSDP Multi-GPU Scaling",
        question: "What does Fully Sharded Data Parallel (FSDP) shard across GPU nodes to eliminate memory redundancy?",
        options: [
          "Model parameters, gradients, and optimizer states",
          "Only raw video files",
          "User passwords and credit card data",
          "Network IP addresses"
        ],
        correct_index: 0,
        explanation: "FSDP shards parameter weights, gradients, and optimizer state tensors across GPUs, un-sharding them on-the-fly during forward and backward passes.",
        xp_reward: 100
      },
      {
        id: `q-2-4`,
        topic: "Free-Threaded CPython (Python 3.13)",
        question: "What historic constraint is eliminated in free-threaded Python 3.13 runtime builds for high-concurrency microservices?",
        options: [
          "The Global Interpreter Lock (GIL)",
          "The print() function",
          "Support for if-else statements",
          "Integer arithmetic calculations"
        ],
        correct_index: 0,
        explanation: "Removing the Global Interpreter Lock allows true multi-threaded CPU execution across multiple cores inside a single Python process.",
        xp_reward: 100
      },
      {
        id: `q-2-5`,
        topic: "Zero-Trust Context Security",
        question: "How does real-time entropy analysis detect zero-day prompt injection attacks before LLM evaluation?",
        options: [
          "By analyzing context token entropy anomalies and unexpected distribution shifts in prompt inputs",
          "By asking the user to solve a CAPTCHA on every prompt",
          "By encrypting the user's monitor screen",
          "By shutting down the cloud server"
        ],
        correct_index: 0,
        explanation: "Adversarial prompt injections introduce structural entropy spikes; inline statistical detectors identify these spikes prior to model execution.",
        xp_reward: 100
      }
    ];
  } else {
    // Cycle 3 Questions based on Grok 3.5, AlphaFold 3, Redis 8.0, Apple MLX & Qiskit 1.0
    return [
      {
        id: `q-3-1`,
        topic: "xAI Grok 3.5 Multi-Modal Latent Stream",
        question: "How does high-density cross-attention process video, text, and code tokens in Grok 3.5?",
        options: [
          "By projecting all modalities into a unified latent feature space",
          "By converting images into ASCII text art",
          "By deleting video frames before processing",
          "By running three separate disconnected computers"
        ],
        correct_index: 0,
        explanation: "Cross-attention aligns vision, code, and text tokens into a single multi-modal latent representation stream.",
        xp_reward: 100
      },
      {
        id: `q-3-2`,
        topic: "AlphaFold 3 Molecular Structure Prediction",
        question: "What architecture enables AlphaFold 3 to predict 3D structures of protein-ligand interactions?",
        options: [
          "A diffusion-based neural network architecture",
          "A simple spreadsheet macro",
          "Linear regression equations",
          "Random number generators"
        ],
        correct_index: 0,
        explanation: "AlphaFold 3 incorporates generative diffusion models to predict raw atomic coordinates directly for complex biomolecular assemblies.",
        xp_reward: 100
      },
      {
        id: `q-3-3`,
        topic: "Apple MLX Unified Memory Architecture",
        question: "Why does Apple Silicon's Unified Memory Architecture (UMA) benefit local LLM execution?",
        options: [
          "CPU and GPU share the same high-bandwidth RAM, eliminating data transfer over PCIe buses",
          "It forces models to run only when connected to power chargers",
          "It doubles battery consumption automatically",
          "It limits RAM size to 256MB"
        ],
        correct_index: 0,
        explanation: "UMA allows Apple Silicon GPUs to access up to 128GB+ unified memory at high bandwidth without copying model weights over bus interconnects.",
        xp_reward: 100
      },
      {
        id: `q-3-4`,
        topic: "Redis 8.0 In-Memory SIMD Vector Acceleration",
        question: "What CPU instruction set extension allows Redis 8.0 to compute cosine similarity at 1M+ QPS?",
        options: [
          "SIMD (Single Instruction, Multiple Data) vectorization",
          "Bluetooth radio signals",
          "Analog dial-up modems",
          "Printer spooling drivers"
        ],
        correct_index: 0,
        explanation: "SIMD instruction sets (AVX-512 / ARM NEON) execute high-dimensional vector dot products in parallel across hardware vector registers.",
        xp_reward: 100
      },
      {
        id: `q-3-5`,
        topic: "Qiskit 1.0 Quantum Circuit Synthesis",
        question: "What is the primary function of quantum error mitigation algorithms on noisy processors?",
        options: [
          "To estimate and subtract quantum noise artifacts from measured quantum expectation values",
          "To turn quantum computers into standard laptop CPUs",
          "To erase quantum qubits after 1 second",
          "To prevent physical cooling of quantum fridges"
        ],
        correct_index: 0,
        explanation: "Error mitigation algorithms run classical post-processing passes over quantum circuit sampling data to suppress decoherence errors.",
        xp_reward: 100
      }
    ];
  }
}

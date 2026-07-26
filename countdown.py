import tkinter as tk
from datetime import datetime, timedelta
import sys

# Target time: Today at 23:30
now = datetime.now()
target = now.replace(hour=23, minute=30, second=0, microsecond=0)
if now > target:
    target += timedelta(days=1)

root = tk.Tk()
root.title("AI Agent Countdown")
root.geometry("450x200")
root.configure(bg="#121212")
root.resizable(False, False)

# Keep the window on top
root.attributes("-topmost", True)

label_title = tk.Label(root, text="AI AGENT PIPELINE TRIGGER", font=("Helvetica", 12, "bold"), fg="#888888", bg="#121212")
label_title.pack(pady=15)

label_timer = tk.Label(root, text="00:00:00", font=("Helvetica", 36, "bold"), fg="#00ffcc", bg="#121212")
label_timer.pack(pady=5)

label_status = tk.Label(root, text="Waiting for 11:30 PM IST...", font=("Helvetica", 10, "italic"), fg="#ff9900", bg="#121212")
label_status.pack(pady=10)

def update_timer():
    now = datetime.now()
    remaining = target - now
    total_seconds = int(remaining.total_seconds())
    
    if total_seconds <= 0:
        label_timer.config(text="LAUNCHING!", fg="#ff007f")
        label_status.config(text="Agent workflow triggered in the cloud!", fg="#00ff00")
        root.after(5000, sys.exit)
        return
        
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    time_str = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    label_timer.config(text=time_str)
    root.after(1000, update_timer)

update_timer()
root.mainloop()

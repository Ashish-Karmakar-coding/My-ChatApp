import { useRef, useState } from "react";
import useChatStore from '../lib/useChatStore.js';
import { Image, Send, X, Smile, Plus } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from 'emoji-picker-react';

const InputComp = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="px-4 py-2 w-full flex items-end gap-2 bg-[var(--bg-secondary)] relative">

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-[70px] left-4 z-50">
          <EmojiPicker
            theme="dark"
            onEmojiClick={onEmojiClick}
            width={300}
            height={400}
          />
        </div>
      )}

      {/* Header Actions (Plus/Emoji) */}
      <div className="flex gap-2 mb-2.5 text-[var(--text-secondary)]">
        <button
          className={`hover:text-[var(--text-primary)] transition-colors ${showEmojiPicker ? "text-[var(--color-accent)]" : ""}`}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          title="Emoji"
        >
          <Smile />
        </button>
        <button
          className="hover:text-[var(--text-primary)] transition-colors"
          onClick={() => fileInputRef.current?.click()}
          title="Attach"
        >
          <Plus />
        </button>
      </div>

      {/* Input Feild Container */}
      <div className="flex-1">
        {imagePreview && (
          <div className="fixed bottom-20 left-4 right-4 md:left-[450px] p-4 bg-[var(--bg-secondary)] z-50 rounded-lg shadow-lg border border-[var(--glass-border)] flex gap-4 max-w-fit">
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              <button onClick={removeImage} className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-[var(--text-secondary)] border border-[var(--glass-border)]">
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center w-full gap-2">
          <input
            type="text"
            className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-4 py-2.5 outline-none placeholder-[var(--text-secondary)] text-sm"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={() => setShowEmojiPicker(false)} // Close picker when typing
          />
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

          <button type="submit" className="p-2.5 rounded-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm" disabled={!text.trim() && !imagePreview}>
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputComp;

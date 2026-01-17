import { useRef, useState } from "react";
import useChatStore from '../lib/useChatStore.js';
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const InputComp = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
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
      await sendMessage({
        text: text.trim(),
        photo: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="w-full">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-2xl ring-2 ring-white/10 shadow-2xl"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2.5 -right-2.5 size-7 rounded-xl bg-red-500/90 text-white
              flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 relative">
          <input
            type="text"
            className="input-modern pr-14"
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300
                     ${imagePreview ? "text-cyan-400 bg-cyan-400/10" : "text-slate-500 hover:text-cyan-400 hover:bg-cyan-400/10"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </button>
        </div>

        <button
          type="submit"
          className="btn-modern !p-3.5 shadow-cyan-500/10 hover:shadow-cyan-500/20"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default InputComp;

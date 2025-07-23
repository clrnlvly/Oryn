import { useState } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter(n => n._id !== note._id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note.");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Link
        to={`/notes/${note._id}`}
        className="card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[hsl(var(--p))]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirm(true);
                }}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
            <h2 className="text-lg font-bold text-error">Delete Note?</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-sm btn-error text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;

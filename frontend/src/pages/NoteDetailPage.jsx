import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try
      {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);

      }
      catch(error)
      {
        console.log("Error in fetching note.", error);
        toast.error("Failed to load note.");
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const [showConfirm, setShowConfirm] = useState(false);
  const confirmDelete = async () => {
  try {
    await api.delete(`/notes/${id}`); // Assuming `id` is available
    toast.success("Note deleted successfully!");
    navigate("/"); // Or any route after deletion
  } catch (error) {
    console.error("Error in deleting note.", error);
    toast.error("Failed to delete note.");
  } finally {
    setShowConfirm(false);
  }
};



  const handleSave = async() => {
    if(!note.title.trim() || !note.content.trim())
    {
      toast.error("Please add a title and content.");
      return;
    }

    setSaving(true);

    try
    {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    }
    catch(error)
    {
      console.log("Error in updating note.", error);
      toast.error("Failed to update note.");
    }
    finally
    {
      setSaving(false);
    }
  };

  if(loading) 
  {
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }
  

  return (
  <>
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here ..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
          <h2 className="text-lg font-bold text-error">Delete Note?</h2>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setShowConfirm(false)} className="btn btn-sm">
              Cancel
            </button>
            <button onClick={confirmDelete} className="btn btn-sm btn-error text-white">
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default NoteDetailPage;

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NoteComponent = () => {
  const token = useSelector((state) => state.auth.token); //
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [editedNote, setEditedNote] = useState({
    id: null,
    title: "",
    content: "",
  });


  

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/notes", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEditNote = (note) => {
    setEditedNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: editedNote.title,
          content: editedNote.content,
        }),
      });

      if (response.status === 201) {
        setEditedNote({
          id: null,
          title: "",
          content: "",
        });
        fetchNotes();
      } else {
        console.error("Error adding note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (id) => {
    if (!editedNote.title.trim()) return;

    try {
      const response = await fetch(`http://localhost:3002/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:token,
        },
        body: JSON.stringify({
          title: editedNote.title,
          content: editedNote.content,
        }),
      });

      if (response.status === 200) {
        fetchNotes();
        setEditedNote({
          id: null,
          title: "",
          content: "",
        });
      } else {
        console.error("Error updating note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 204) {
        fetchNotes();
      } else {
        console.error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Note Management
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={editedNote.id ? "" : editedNote.title}
          onChange={(e) =>
            setEditedNote({ ...editedNote, title: e.target.value })
          }
        />
        <TextField
          label="Content"
          fullWidth
          style={{ marginTop: "10px" }}
          value={editedNote.id ? "" : editedNote.content}
          onChange={(e) =>
            setEditedNote({ ...editedNote, content: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleAddNote}
        >
          Add Note
        </Button>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes?.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    {editedNote.id === note.id ? (
                      <TextField
                        value={editedNote.title}
                        onChange={(e) =>
                          setEditedNote({
                            ...editedNote,
                            title: e.target.value,
                          })
                        }
                      />
                    ) : (
                      note.title
                    )}
                  </TableCell>
                  <TableCell>
                    {editedNote.id === note.id ? (
                      <TextField
                        value={editedNote.content}
                        onChange={(e) =>
                          setEditedNote({
                            ...editedNote,
                            content: e.target.value,
                          })
                        }
                      />
                    ) : (
                      note.content
                    )}
                  </TableCell>
                  <TableCell>
                    {editedNote.id === note.id ? (
                      <Button
                        onClick={() => handleUpdateNote(note.id)}
                        color="primary"
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton onClick={() => handleEditNote(note)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteNote(note.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default NoteComponent;

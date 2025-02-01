import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa";

const FacebookLite = () => {
  const [feeds, setFeeds] = useState([]);
  const [newFeed, setNewFeed] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handlePost = () => {
    if (!newFeed.trim()) return;
    const updatedFeeds = [...feeds];
    if (editingIndex !== null) updatedFeeds[editingIndex].text = newFeed;
    else updatedFeeds.unshift({ text: newFeed, likes: 0, date: new Date().toLocaleString() });
    setFeeds(updatedFeeds);
    setNewFeed("");
    setEditingIndex(null);
  };
  

  const handleAction = (index, action) => {
    const updatedFeeds = [...feeds];
    if (action === "like") updatedFeeds[index].likes += 1;
    else if (action === "dislike") updatedFeeds[index].likes -= 1;
    else if (action === "edit") {
      setNewFeed(updatedFeeds[index].text);
      setEditingIndex(index);
      return;
    } else updatedFeeds.splice(index, 1);
    setFeeds(updatedFeeds);
  };

  return (
    <div className="container mt-4">
      <Form.Control as="textarea" value={newFeed} onChange={(e) => setNewFeed(e.target.value)} placeholder="Write a new feed..." />
      <Button className="mt-2" onClick={handlePost}>{editingIndex !== null ? "Update" : "Post"}</Button>
      {feeds.map((feed, index) => (
        <Card key={index} className="mt-3 p-3">
          <Card.Body>
            <Card.Text>{feed.text}</Card.Text>
            <small className="text-muted">{feed.date}</small>
            <div className="mt-2 d-flex gap-2">
              <Button variant="outline-success" size="sm" onClick={() => handleAction(index, "like")}><FaThumbsUp /> {feed.likes}</Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleAction(index, "dislike")}><FaThumbsDown /></Button>
              <Button variant="outline-primary" size="sm" onClick={() => handleAction(index, "edit")}><FaEdit /></Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleAction(index, "delete")}><FaTrash /></Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FacebookLite;

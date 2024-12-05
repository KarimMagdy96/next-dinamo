"use client";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Table, Button, Modal, Input, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Post, NewPost } from "./../types/types";
import { notification } from "antd";

type HomeClientProps = {
  initialPosts: Post[];
};

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [Posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, SetNewPost] = useState<NewPost>({ title: "", body: "" });
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showNotification = (
    type: "success" | "error",
    message: string,
    description?: string
  ) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  // add posts
  const handleAddPost = async () => {
    if (!newPost.title.trim() || !newPost.body.trim()) {
      showNotification(
        "error",
        "Missing fields",
        "Both title and body must be provided."
      );
      return;
    }
    setIsLoading(true);
    try {
      const addPost = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!addPost.ok) throw new Error("Failed to add post");
      const data: Post = await addPost.json();
      setPosts([...Posts, data]);
      SetNewPost({ title: "", body: "" });
      showNotification(
        "success",
        "Post added successfully",
        "Your post has been added."
      );
    } catch (error) {
      console.log(error);
      showNotification(
        "error",
        "Error adding post",
        "An error occurred while adding the post."
      );
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  // update posts
  const handelUpdatePost = async () => {
    if (editingPostId === null) return;

    if (!newPost.title.trim() || !newPost.body.trim()) {
      showNotification(
        "error",
        "Missing fields",
        "Both title and body must be provided."
      );
      return;
    }
    setIsLoading(true);
    try {
      const updatePost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPostId}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...newPost, id: editingPostId }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!updatePost.ok) throw new Error("Failed to update post");
      const modifiedPost: Post = await updatePost.json();
      setPosts(
        Posts.map((post) => (post.id === modifiedPost.id ? modifiedPost : post))
      );
      SetNewPost({ title: "", body: "" });
      setEditingPostId(null);
      showNotification(
        "success",
        "Post updated successfully",
        "Your post has been updated."
      );
    } catch (error) {
      showNotification(
        "error",
        "Error updating post",
        "An error occurred while updating the post."
      );
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  // delete posts
  const handleDeletePost = async (id: number) => {
    setIsLoading(true);
    try {
      const deleteRes = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { method: "DELETE" }
      );
      if (!deleteRes.ok) throw new Error("Failed to delete post");
      setPosts(Posts.filter((post) => post.id !== id));
      showNotification(
        "success",
        "Post deleted successfully",
        "The post has been removed."
      );
    } catch (error) {
      showNotification(
        "error",
        "Error deleting post",
        "An error occurred while deleting the post."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // edit posts
  const handelEditPost = (post: Post) => {
    setEditingPostId(post.id);
    SetNewPost({ title: post.title, body: post.body });
    setShowModal(true);
  };

  // cancel edit posts
  const handleCancelUpdate = () => {
    SetNewPost({ title: "", body: "" }); // Reset the post form data
    setEditingPostId(null); // Reset the editing post ID
  };

  //  table columns for anti design
  const columns: ColumnsType<Post> = [
    {
      title: "Index",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
    },
    {
      title: "Actions",
      render: (_, post) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<FaRegEdit />}
            onClick={() => handelEditPost(post)}
          />
          <Button
            type="primary"
            danger
            icon={<RiDeleteBin6Fill />}
            onClick={() => handleDeletePost(post.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setShowModal(true);
          handleCancelUpdate();
        }}
        className="mb-8 mt-4"
      >
        Create New Post 🗞️
      </Button>
      {isLoading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}
      <Table
        dataSource={Posts.map((post, index) => ({
          key: index,
          ...post,
        }))}
        columns={columns}
      />

      <Modal
        title={editingPostId ? "Edit Post" : "Add New Post"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingPostId ? handelUpdatePost() : handleAddPost();
          }}
        >
          <div className="mb-4">
            <label className=" pb-5">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={newPost.title}
              onChange={(e) =>
                SetNewPost({ ...newPost, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-5">
              Body <span className="text-red-500">*</span>
            </label>
            <Input.TextArea
              value={newPost.body}
              onChange={(e) => SetNewPost({ ...newPost, body: e.target.value })}
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowModal(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {editingPostId ? "Update Post" : "Add Post"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

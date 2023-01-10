import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Comments from "../feedback/Comments";
import CreateCommentForm from "../feedback/CreateCommentForm";
import MiniSpinner from "../loading/MiniSpinner";
import "./singlepost.css";

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
  AiOutlinePlus,
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPost,
  likePost,
  unlikePost,
} from "../../services/post/postSlice";
import { getMostLikedCommentsByPostId } from "../../services/comment/commentSlice";

const SinglePost = () => {
  const path = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState("");
  const [owner, setOwner] = useState("");
  const [mostLikedComments, setMostLikedComments] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  const [open, setOpen] = useState(false);

  const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/";

  const fetchMostLikedComments = async (postId) => {
    const commentResp = await axios.get(
      rootAPI + `comment/getCommentsByMostLiked/${postId}`
    );
    dispatch(getMostLikedCommentsByPostId(postId)).then(() => {
      setMostLikedComments(commentResp.data);
    });
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const postRes = await axios.get(rootAPI + "post/" + path);
        const userRes = await axios.get(
          rootAPI + `user/profil/${postRes.data.userId}`
        );
        setPost(postRes.data);
        setOwner(userRes.data);
        dispatch(getCurrentPost(postRes.data._id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [path, comments, dispatch]);

  useEffect(() => {
    fetchMostLikedComments(post._id);
  }, [post._id, dispatch]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  var date = new Date(post.purchase_date);
  const year = date.getFullYear();

  // Like a post
  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  // Unlike a post
  const handleUnlike = () => {
    dispatch(unlikePost(post._id));
  };
  return (
    <>
      <section className="single-post">
        {post ? (
          <>
            <div className="sidebar">
              <div className="product-wrapper">
                {/* <div className="product-category">
								<p>{post.category}</p>
							</div> */}
                <div className="product-price">
                  <div className="row">
                    <div className="col-6 col-divider">
                      <div className="initial-price">
                        <p>IDR{post.price}</p>
                      </div>
                      <span className="initial-price">Initial Price</span>
                    </div>
                    <div className="col-6">
                      <div className="suggested-price">
                        {mostLikedComments ? (
                          <p>
                            IDR{mostLikedComments[0]?.suggestedPrice || "0"}
                          </p>
                        ) : (
                          //   <p>none</p>
                          <MiniSpinner />
                        )}
                      </div>
                      <span className="suggested-price">
                        Most Suggested Price
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-option">
                  <button className="btn btn-outline-dark">
                    <AiOutlineMessage className="me-1" />
                    Contact owner
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => setOpen(true)}
                  >
                    Give Feedback
                  </button>
                </div>

                <div className="product-owner">
                  <div className="user-profile">
                    <div className="user-image">
                      {owner[0].image ? (
                        <img src="" alt="" />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="user-info">
                      <div>
                        <div className="username">
                          {owner[0].first_name} {owner[0].last_name}
                        </div>
                        {/* <div className="created-at">{moment(`${post.createdAt}`, "YYYYMMDD").fromNow()}</div> */}
                        <div className="created-at">
                          {formatDate(`${post.createdAt}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="user-option">
                    {user ? (
                      <button className="btn btn-dark">
                        <AiOutlinePlus />
                        Follow
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="product-name">
                  <h1>{post.title}</h1>
                </div>
                <div className="product-original-price">
                  <p>
                    Original price:{" "}
                    <span>
                      IDR{post.original_price} ({year})
                    </span>
                  </p>
                </div>
                {/* <div className="product-brand">
								<p>{post.brand}</p>
							</div> */}

                <div className="product-desc">
                  <h2>Description</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
            <div className="main">
              <div className="container-fluid">
                <div className="heading">
                  <img src={post.image} alt="product" />
                </div>
                <div className="body">
                  <div className="post-detail">
                    <div className="like-comment">
                      {comments?.length} comments • {posts.like?.length} likes
                    </div>
                    {user ? (
                      <div className="post-option">
                        <button className="share-post">
                          <RiShareForwardLine size="1.6em" />
                          Share
                        </button>
                        <button className="comment-post">
                          <FaRegComment />
                          Comment
                        </button>

                        {posts.like?.includes(user?.userId.toString()) ? (
                          <button className="like-post" onClick={handleUnlike}>
                            <AiFillHeart size="1.4em" />
                            Like
                          </button>
                        ) : (
                          <button className="like-post" onClick={handleLike}>
                            <AiOutlineHeart size="1.4em" />
                            Like
                          </button>
                        )}
                        <div className="other-option">
                          <BsThreeDots />
                        </div>
                      </div>
                    ) : (
                      <p>
                        Please <span>sign in</span> to like or give feedback.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Comments postId={post._id} user={user} />
            </div>
          </>
        ) : (
          <div className="spinner-container">
            <MiniSpinner />
          </div>
        )}
      </section>
      {open && <CreateCommentForm setOpen={setOpen} user={user} />}
    </>
  );
};

export default SinglePost;

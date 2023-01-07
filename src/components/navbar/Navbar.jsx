import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import "./navbar.css";
import { useSelector } from "react-redux";
import CreatePostForm from "../post/CreatePostForm";

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);

	const [open, setOpen] = useState(false);
	// Search by query
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const handleSearch = (e) => {
		if (e.key === "Enter") {
			navigate(`/search?q=${search}`);
		}
	};

	return (
		<>
			<nav className="row align-items-center">
				<div className="container-fluid">
					<Link to="/" className="link">
						<div className="nav-brand">
							{/* <p>THE CURIOUS FOOTWEAR</p> */}
							<p>FOOTWARE</p>
						</div>
					</Link>
					<div className="search d-none d-lg-block">
						<div className="search-box">
							<input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleSearch} />
							<div className="item">
								<div className="search-icon">
									<BiSearch size="1rem" color="#666666" />
								</div>
							</div>
						</div>
					</div>
					<div className="nav-items d-lg-flex">
						{user ? (
							<>
								<div className="item-btn">
									<Link to="/about" className="link">
										<button type="button" className="btn">
											About
										</button>
									</Link>
								</div>
								<div className="divider">|</div>
								<div className="item" onClick={() => setOpen(true)}>
									Share your footwear
								</div>
								<div className="divider">|</div>
								<div className="item">
									<Link to={`/profile/me`} className="link">
										Hi, {user.first_name}
									</Link>
								</div>
								{/* <div className="item-btn">
									<button type="button" className="btn" onClick={handleLogout}>
										Log out
									</button>
								</div> */}
							</>
						) : (
							<>
								<div className="item-btn">
									<Link to="/about" className="link">
										<button type="button" className="btn">
											About
										</button>
									</Link>
								</div>
								<div className="divider">|</div>
								<div className="item-btn">
									<Link to="/signin" className="link">
										<button type="button" className="btn">
											Sign in
										</button>
									</Link>
								</div>
							</>
						)}
					</div>
					<div className="mobile-toggler d-lg-none ms-5">
						<div data-bs-toggle="modal" data-bs-target="#naveModal">
							<GoThreeBars size="2rem" color="#000" />
						</div>
					</div>
				</div>
			</nav>

			<div className="modal" id="naveModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<div className="nav-brand">FOOTWARE</div>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						{user ? (
							<div className="modal-body">
								<div className="modal-line">
									<div className="modal-item">Hi, {user.first_name}</div>
								</div>
								<div className="modal-line">
									<div className="modal-item">
										<Link to="/post/create" className="link">
											Share your footwear
										</Link>
									</div>
								</div>
								<div className="modal-btn">
									<div className="item-btn">
										<button type="button" className="btn">
											Log out
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="modal-body">
								<div className="modal-btn">
									<Link to="/login" className="link">
										<button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
											Sign in
										</button>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{open && <CreatePostForm setOpen={setOpen} />}
		</>
	);
};

export default Navbar;

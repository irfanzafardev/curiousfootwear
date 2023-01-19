import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../services/auth/authSlice";
import CreatePostForm from "../post/CreatePostForm";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import "./navbar.css";

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);

	const [open, setOpen] = useState(false);

	const [isActive, setActive] = useState(false);
	const toggleClass = () => {
		setActive(!isActive);
	};
	// Search by query
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const handleSearch = (e) => {
		if (e.key === "Enter") {
			navigate(`/search?q=${search}`);
		}
	};
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
		window.location.reload();
	};
	return (
		<>
			<nav className="row align-items-center">
				<div className="container-fluid">
					<Link to="/" className="link">
						<div className="nav-brand">
							<p>FOOTWARE</p>
						</div>
					</Link>
					<div className="search d-none d-lg-block">
						<div className="search-box">
							<input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch} />
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
								<div className="item-btn d-none">
									<Link to="/about" className="link">
										<button type="button" className="btn">
											About
										</button>
									</Link>
								</div>
								<div className="divider d-none">|</div>
								<div className="item">
									<button className="upload-button" onClick={() => setOpen(true)}>
										<AiOutlinePlus />
										<span className="ms-2">Upload footwear</span>
									</button>
								</div>
								<div className="item">
									<div className="user" onClick={toggleClass}>
										<div className="user-profile">{user.image ? <img src="" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
										Hi, {user.first_name}
									</div>
									<div className={isActive ? "dropdown d-block" : "dropdown d-none"}>
										<div className="dropdown-item">
											<div className="profile-image">{user.image ? <img src="" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />}</div>
											<div className="user-name">
												{user.first_name} {user.last_name}
											</div>
											<div className="user-email">{user.email}</div>
											<div className="button-group">
												<Link to={`/profile/me`} className="link">
													<button type="button" className="btn btn-primary">
														See profile
													</button>
												</Link>
												<button type="button" className="btn btn-outline-dark" onClick={handleLogout}>
													Log out
												</button>
											</div>
										</div>
									</div>
									<div className={isActive ? "dropdown-backdrop d-block" : "dropdown-backdrop d-none"} onClick={toggleClass}></div>
								</div>
							</>
						) : (
							<>
								<div className="item-btn d-none">
									<Link to="/about" className="link">
										<button type="button" className="btn">
											About
										</button>
									</Link>
								</div>
								<div className="item">
									<button className="upload-button" onClick={() => setOpen(true)}>
										<AiOutlinePlus />
										<span className="ms-2">Upload footwear</span>
									</button>
								</div>
								<div className="divider d-none">|</div>
								<div className="item">
									<Link to="/signin" className="link">
										Sign in
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
									<Link to={`/profile/me`} className="link">
										<div className="modal-item">Hi, {user.first_name}</div>
									</Link>
								</div>
								<div className="modal-item">
									<div className="modal-btn">
										<button className="upload-button" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(true)}>
											<AiOutlinePlus />
											<span className="ms-2">Upload footwear</span>
										</button>
									</div>
								</div>
								<div className="modal-btn">
									<div className="item-btn">
										<button type="button" className="btn" onClick={handleLogout}>
											Log out
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="modal-body">
								<div className="modal-btn">
									<button className="upload-button" onClick={() => setOpen(true)}>
										<AiOutlinePlus />
										<span className="ms-2" data-bs-dismiss="modal" aria-label="Close">
											Upload footwear
										</span>
									</button>
								</div>
								<div className="modal-btn">
									<Link to="/signin" className="link">
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

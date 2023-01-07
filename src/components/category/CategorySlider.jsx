import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./categoryslider.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CategorySlider = () => {
	const [categories, setCategories] = useState([]);

	const rootAPI = "https://thecuriousfootwear-server.vercel.app/api/category";
	const fetchCategories = async () => {
		const { data } = await axios.get(rootAPI + "/all");
		setCategories(data);
	};
	useEffect(() => {
		fetchCategories();
	}, []);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			paritialVisibilityGutter: 60,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 4,
			paritialVisibilityGutter: 50,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 3,
			paritialVisibilityGutter: 30,
		},
	};
	return (
		<>
			<section className="category-slider">
				<div className="row">
					<div className="col-12 col-lg-6">
						<div className="slider">
							<Carousel responsive={responsive}>
								{categories.map((item) => (
									<div className="item" draggable={false} key={item.categoryId}>
										<Link to={`/category?cat=${item.name}`} className="link">
											<div className="btn btn-outline-dark category-item">{item.name}</div>
										</Link>
									</div>
								))}
							</Carousel>
						</div>
					</div>
					<div className="col-12 col-lg-6 see-more-button">
						<div className="d-flex justify-content-center justify-content-lg-end">
							<p>See all</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CategorySlider;

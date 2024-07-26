import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (hostingImage.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImage.data.data.display_url,
      };
      // console.log(menuItem);
      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item is updated successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold mt-4 mb-4">
        Update this<span className="text-green"> Menu Item</span>
      </h2>
      {/* form input */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full text-gray-400"
            />
          </div>
          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Deserts</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            {/* Prices */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Enter the price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell about the recipe"
              defaultValue={item.recipe}
            ></textarea>
          </div>
          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>{" "}
          <button className="btn bg-green text-white px-6">
            Add Item<FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
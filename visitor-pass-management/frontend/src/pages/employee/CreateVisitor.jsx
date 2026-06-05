import React, { useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import { useAuth } from "../../hooks/useAuth";
import validator from "validator";
import { motion } from "framer-motion";

function CreateVisitor() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    host: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        photo: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const data = {
        ...form,
        host: user?.name,
      };

      if (!data.name || !data.email || !data.phone || !data.host) {
        notify.error("All fields required");
        setLoading(false);
        return;
      }

      if (!validator.isEmail(data.email)) {
        notify.error("Enter valid email");
        setLoading(false);
        return;
      }

      if (!validator.isMobilePhone(data.phone, "en-IN")) {
        notify.error("Enter valid mobile number");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("photo", form.photo);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("host", user?.name);

      await API.post("/visitors", formData);

      notify.success("Visitor Created Successfully 🚀");

      setForm({
        name: "",
        email: "",
        phone: "",
        host: "",
        photo: null,
      });
    } catch (err) {
      notify.error(err.response?.data?.error || "Failed to create visitor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HERO */}

        <div
          className="
      rounded-3xl
      border border-white/10
      bg-linear-to-r
      from-violet-600/20
      via-blue-600/20
      to-cyan-600/20
      p-6
      "
        >
          <h1 className="text-3xl font-bold text-white">Create Visitor</h1>

          <p className="text-slate-300 mt-2">
            Register a new visitor and schedule meetings easily.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT */}

            <div className="lg:col-span-2">
              <div
                className="
            bg-[#0f172a]
            border border-white/10
            rounded-3xl
            p-6
            "
              >
                <h2 className="text-xl font-semibold text-white mb-5">
                  Visitor Information
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Visitor Name"
                    value={form.name}
                    onChange={handleChange}
                    className="
                w-full
                bg-slate-900
                border border-white/10
                text-white
                p-3
                rounded-xl
                "
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Visitor Email"
                    value={form.email}
                    onChange={handleChange}
                    className="
                w-full
                bg-slate-900
                border border-white/10
                text-white
                p-3
                rounded-xl
                "
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="
                w-full
                bg-slate-900
                border border-white/10
                text-white
                p-3
                rounded-xl
                "
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="
  w-full
  bg-gradient-to-r
  from-violet-600
  to-blue-600
  hover:opacity-90
  text-white
  py-3
  rounded-2xl
  font-semibold
  transition
  mt-4
  "
              >
                {loading ? "Creating Visitor..." : "Create Visitor"}
              </button>
            </div>

            {/* RIGHT */}

            <div className="space-y-6">
              {/* PHOTO */}

              <div
                className="
            bg-[#0f172a]
            border border-white/10
            rounded-3xl
            p-6
            "
              >
                <h2 className="text-white font-semibold mb-4">Visitor Photo</h2>

                <div
                  className="
              h-35 lg:h-38
              rounded-2xl
              border border-dashed border-white/10
              overflow-hidden
              flex items-center justify-center
              "
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400">No Photo Selected</span>
                  )}
                </div>

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="
              mt-4
              w-full
              text-slate-400
              "
                />
              </div>

              {/* HOST */}

              <div
                className="
  bg-slate-900
  border border-white/10
  rounded-2xl
  p-4
  "
              >
                <p className="text-slate-400 text-xs uppercase">Host Name</p>

                <p className="text-white font-semibold mt-1">{user?.name}</p>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-slate-400 text-xs uppercase">Email</p>

                  <p className="text-white text-sm mt-1">
                    {user?.email || "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
        </form>
      </div>
    </EmployeeLayout>
  );
}

export default CreateVisitor;

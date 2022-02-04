import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStorage = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

export const Todo = () => {
  const [data, setData] = useState("");
  const [item, setItem] = useState(getStorage);

  const add = () => {
    if (data) {
      setItem([...item, data]);
      setData("");
      toast.success("Added in Items", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Please Type Something!", {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deletItem = (id) => {
    const updated = item.filter((eleme, ind) => {
      return ind !== id;
    });
    setItem(updated);
    toast.error("Items has deleted", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const remove = () => {
    setItem([]);
    toast.warn("All cleared", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
  }, [item]);

  return (
    <div className="container ">
      <div className="container fluid">
        <h4>Add Items & Make a List</h4>

        <div>
          <input
            maxLength="15"
            className="input"
            placeholder="✍ Add Items"
            type="text"
            value={data}
            onChange={(ev) => setData(ev.target.value)}
          />
          <p className="m btn btn-success   w-5 " onClick={add}>
            Add item
          </p>
        </div>

        <div className="section">
          <div className="List-Con">
            <h2>Items</h2>  
            <div className="container  w-100 ">
              {item.map((elem, index) => {
                return (
                  <div className="Contain" key={index}>
                    <div className="bg d-flex">
                      <div className=" col">
                        <h5 className="ss ">{elem}</h5>{" "}
                      </div>
                      <div className="delete-sec">
                        <i
                          className="fa fa-trash-alt ss fs-6"
                          onClick={() => deletItem(index)}
                        ></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button className="btn btn-primary remove" onClick={remove}>
          Clear all
        </button>
        <ToastContainer
          position="top-left"
          autoClose={200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
        />
      </div>
    </div>
  );
};

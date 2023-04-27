import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Las contraseñas no coinciden");
        } else {
            const userData = { name, email, password };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h4>
                    <FaUser /> Register
                </h4>
                <p>Crear una cuenta</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Introduce tu nombre"
                            onChange={onChange}
                        ></input>

                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Introduce tu email"
                            onChange={onChange}
                        ></input>

                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Introduce tu Contraseña"
                            onChange={onChange}
                        ></input>

                        <input
                            className="form-control"
                            id="password2"
                            type="password"
                            name="password2"
                            value={password2}
                            placeholder="Confirma tu Contraseña"
                            onChange={onChange}
                        ></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;

import { useDispatch } from "react-redux";
import { borrarTareas } from "../features/tareas/tareaSlice";

const TareaItem = ({ tarea }) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="tarea">
                {new Date(tarea.createdAt).toLocaleString("es-MX")}
                <h4>{tarea.texto}</h4>
                <button
                    className="close"
                    onClick={() => {
                        dispatch(borrarTareas(tarea._id));
                    }}
                >
                    x
                </button>
            </div>
        </>
    );
};

export default TareaItem;

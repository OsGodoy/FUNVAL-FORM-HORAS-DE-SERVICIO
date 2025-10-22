import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { getFunval, postFunval, putFunval } from "../api/funval/services";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/Auth-context";

const UserFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user: userSesion } = useAuth()

    const schema = Yup.object().shape({
        f_name: Yup.string().required("El primer nombre es requerido"),
        m_name: Yup.string(),
        f_lastname: Yup.string().required("El primer apellido es requerido"),
        s_lastname: Yup.string(),
        email: Yup.string().email("Correo inválido").required("El correo es requerido"),
        password:
            id === "new"
                ? Yup.string().required("La contraseña es requerida").min(6, "Mínimo 6 caracteres")
                : Yup.string().nullable(),
        confirmPassword:
            id === "new"
                ? Yup.string()
                    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
                    .required("Confirme la contraseña")
                : Yup.string().nullable(),
        role_id: Yup.number().required("El rol es requerido"),
        schools: Yup.array().when("role_id", {
            is: (role_id) => Number(role_id) === 1 || role_id === "student",
            then: (schema) => schema.min(1, "Debe seleccionar al menos una escuela"),
            otherwise: (schema) => schema.optional(),
        }), 
            controller_id: Yup.number().default(2).optional(),
            recruiter_id: Yup.number().default(3).optional(),
            country_id: Yup.number().default(4).optional()
    });

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            f_name: "",
            m_name: "",
            f_lastname: "",
            s_lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            role_id: "",
            schools: [], 
        },
    });

    const selectedRole = watch("role_id");

    useEffect(() => {
        getRoles();
        getSchools();
        if (id !== "new" && !isNaN(Number(id))) {
            loadUserData(id);
        }
    }, [id]);

    const getRoles = async () => {
        try {
            const response = await getFunval("/roles");
            setRoles(response.data || []);
        } catch {
            toast.error("Error al cargar los roles");
        }
    };

    const getSchools = async () => {
        try {
            const response = await getFunval("/schools");
            setSchools(response.data || []);
        } catch {
            toast.error("Error al cargar las escuelas");
        }
    };

    const loadUserData = async (userId) => {
        try {
            setLoading(true);
            const response = await getFunval(`/users/${userId}`);
            if (response?.data) {
                reset({
                    f_name: response.data.f_name || "",
                    m_name: response.data.m_name || "",
                    f_lastname: response.data.f_lastname || "",
                    s_lastname: response.data.s_lastname || "",
                    email: response.data.email || "",
                    password: "",
                    role_id: response.data.role_id || "",
                    schools: response.data.schools?.map((s) => s.id) || [],
                });
            }
        } catch {
            toast.error("Error al cargar el usuario");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { confirmPassword, ...userData } = data;

            if (id !== "new" && !isNaN(Number(id))) {
                await putFunval(`/users/${id}`, userData);
                toast.success("Usuario actualizado correctamente");
            } else {
                await postFunval("/users", userData);
                toast.success("Usuario creado con éxito");
            }

            navigate("/users");
        } catch (error) {
            console.error("Error al guardar usuario:", error.response);
            toast.error(`Error al guardar datos del usuario: ${error.response?.data?.message}` );
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(`/users`);
    };
    console.log("userSesion:", userSesion);
    return (
        <div className="flex flex-col gap-6">
            <Toaster position="top-right" />

            <motion.div
                className="flex justify-around items-center px-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    {id === "new" ? "Crear Usuario" : "Editar Usuario"}
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoBack}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-300 text-gray-500  font-semibold rounded-lg shadow-md hover:bg-gray-400 hover:text-white transition duration-200"
                >
                    <ArrowLeftCircle size={20} />
                    Volver
                </motion.button>
            </motion.div>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Primer Nombre</label>
                        <Controller
                            name="f_name"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                        {errors.f_name && <p className="text-red-500 text-xs">{errors.f_name.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Segundo Nombre</label>
                        <Controller
                            name="m_name"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Primer Apellido</label>
                        <Controller
                            name="f_lastname"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                        {errors.f_lastname && <p className="text-red-500 text-xs">{errors.f_lastname.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Segundo Apellido</label>
                        <Controller
                            name="s_lastname"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Correo</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input type="email" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    {/** 
                     * Cuando el contexto este ccreado aplicar la siguiente condición
                     * para mostrar los campos de contraseña
                     * id === 'new' || (id !== 'new'  && !isNaN(Number(id)) && userSesion.roleName === 'Admin') 
                     * */}
                    { true && (
                        <>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium">Contraseña</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input type="password" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium">Confirmar Contraseña</label>
                            <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <input type="password" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                            )}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        </>
                        
                    )}
                    

                    <div>
                        <label className="text-sm font-medium">Rol</label>
                        <Controller
                            name="role_id"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200">
                                    <option value="">Seleccione un rol</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.role_id && <p className="text-red-500 text-xs">{errors.role_id.message}</p>}
                    </div>

                    {Number(selectedRole) === 1 || selectedRole === "student" ? (
                        <div>
                            <label className="text-sm font-medium">Escuelas</label>
                            <Controller
                                name="schools"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        multiple
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200 h-28"
                                        value={field.value || []}
                                        onChange={(e) =>
                                            field.onChange(
                                                Array.from(e.target.selectedOptions, (option) => Number(option.value))
                                            )
                                        }
                                    >
                                        {schools.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.schools && <p className="text-red-500 text-xs">{errors.schools.message}</p>}
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm font-medium">Escuela (opcional)</label>
                            <Controller
                                name="schools"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                                        value={field.value?.[0] || ""} // 🔹 Asegura valor escalar
                                        onChange={(e) => field.onChange([Number(e.target.value)])} // 🔹 Devuelve array al estado
                                    >
                                        <option value="">Seleccione una escuela</option>
                                        {schools.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                    )}

                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Guardando..." : id === "new" ? "Crear Usuario" : "Actualizar Usuario"}
                        </button>
                    </div>
                </form>
            </div>

        </div>

    );
};

export default UserFormPage;

import Link from "next/link";
import styles from "./Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {push} = useRouter();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(result.status === 200) {
        event.target.reset();
        setIsLoading(false);
        push("/auth/login");
    } else {
        setIsLoading(false);
        setError(result.status === 400 ? "Email already exists" : "");
    }


    };
    return(
        <div className={styles.register}>
             <h1 className={styles.register_title}>Register</h1>
             {error && <p className={styles.register_error}>{error}</p>}
            <div className={styles.register_form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register_form_item}>
                        <label htmlFor="email" className={styles.register_form_item_label}>Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="email"
                    className={styles.register_form_item_input}
                    />
                    </div>
                    <div className={styles.register_form_item}>
                        <label htmlFor="fullname" className={styles.register_form_item_label}>Fullname</label>
                    <input 
                    type="text" 
                    id="fullname" 
                    name="fullname" 
                    placeholder="Fullname"
                    className={styles.register_form_item_input}
                    />
                    </div>
                    <div className={styles.register_form_item}>
                        <label htmlFor="password" className={styles.register_form_item_label}>Paswword</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="password"
                    className={styles.register_form_item_input}
                    />
                    </div>
                    <button type="submit" className={styles.register_form_item_button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                
                
            </div>
            <p className={styles.register_link}>
                Have an account? Sign in <Link href="/auth/login">here</Link>
                </p>
        </div>

    );
};
export default RegisterView;

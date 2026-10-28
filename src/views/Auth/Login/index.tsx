import Link from "next/link";
import styles from "./Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { push, query } = useRouter();
    const callbackUrl: any = query.callbackUrl || '/';
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl
            });

            if(!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Email or password is incorrect");
            }


        } catch (error: any) {
            setIsLoading(false);
            setError("Email or password is incorrect");

        }
    };
    return(
        <div className={styles.login}>
             <h1 className={styles.login_title}>Login</h1>
             {error && <p className={styles.login_error}>{error}</p>}
            <div className={styles.login_form}>
                
                <form onSubmit={handleSubmit}>
                    <div className={styles.login_form_item}>
                        <label htmlFor="email" className={styles.login_form_item_label}>Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="email"
                    className={styles.login_form_item_input}
                    />
                    </div>
                  
                    <div className={styles.login_form_item}>
                        <label htmlFor="password" className={styles.login_form_item_label}>Paswword</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="password"
                    className={styles.login_form_item_input}
                    />
                    </div>
                    <button type="submit" className={styles.login_form_item_button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    
                </form>
                <button onClick={() => 
                    signIn("google", {
                        callbackUrl,
                        redirect: false
                        
                    })
                }
                className={styles.login_form_item_google}
             >
                Sign In With Google</button>
                
                
            </div>
            <p className={styles.login_link}>
                Don{"'"}t Have an account? Sign up <Link href="/auth/register">here</Link>
                </p>
        </div>

    );
};
export default LoginView;

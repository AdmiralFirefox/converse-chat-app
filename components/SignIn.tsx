import Image from "next/image";
import styles from "@/styles/SignIn.module.scss";

interface SignInProps {
  signInWithgoogle: () => Promise<void>;
}

const SignIn = ({ signInWithgoogle }: SignInProps) => {
  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["details"]}>
          <div className={styles["title"]}>
            <h1>Converse...</h1>
            <div className={styles["image-wrapper"]}>
              <Image src="/chat.png" alt="Chat Icon" fill sizes="100vw" />
            </div>
          </div>
          <p>Communicate with everyone now!</p>
          <button onClick={signInWithgoogle}>
            Sign In With Google
            <Image
              src="/google.png"
              alt="Google Icon"
              width={30}
              height={30}
              sizes="100vw"
            />
          </button>
        </div>
      </div>

      <div className={styles["background"]}>
        <Image src="/signin-background.png" alt="" fill sizes="100vw" />
      </div>
    </>
  );
};

export default SignIn;

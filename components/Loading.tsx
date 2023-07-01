import { SyncLoader } from "react-spinners";
import styles from "@/styles/Loading.module.scss";

type LoadingProps = {
  message: string;
};

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className={styles["loading-wrapper"]}>
      <div className={styles["loading-container"]}>
        <SyncLoader color="#ffffff" size={17} />
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default Loading;

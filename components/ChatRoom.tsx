import { useState, useEffect } from "react";
import { MessageFormSocial } from "react-chat-engine";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";
import { UserInfo } from "@/lib/authcontext";
import { useElementSize } from "@/hooks/useElementSize";
import { useWindowSize } from "@/hooks/useWindowSize";
import styles from "@/styles/ChatRoom.module.scss";

interface ChatRoomProps {
  user: UserInfo | null;
  signOutAccount: () => Promise<void>;
}

const ChatRoom = ({ user, signOutAccount }: ChatRoomProps) => {
  const [navBarRef, { height: navHeight }] = useElementSize();
  const { height: windowHeight } = useWindowSize();

  const [loading, setLoading] = useState(true);

  const currentTime = new Date();
  const timeZoneOffSet = currentTime.getTimezoneOffset() / 60;

  const getFile = async (url: string) => {
    const res = await fetch(url);
    const data = await res.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.NEXT_PUBLIC_CHATENGINE_PROJECT_ID,
            "user-name": user?.email,
            "user-secret": user?.uid,
          },
        });

        setLoading(false);
      } catch (error) {
        try {
          const formData = new FormData();
          formData.append("email", user?.email as string);
          formData.append("username", user?.email as string);
          formData.append("secret", user?.uid as string);

          const avatar = await getFile(user?.photoURL as string);

          formData.append("avatar", avatar, avatar.name);

          await axios.post("https://api.chatengine.io/users/", formData, {
            headers: {
              "private-key": process.env.NEXT_PUBLIC_CHATENGINE_PRIVATE_KEY,
            },
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [user]);

  if (!user || loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className={styles["navbar"]} ref={navBarRef}>
        <h1>Converse</h1>
        <button onClick={signOutAccount}>Sign Out</button>
      </nav>

      <ChatEngine
        height={windowHeight - navHeight - 1}
        projectID={process.env.NEXT_PUBLIC_CHATENGINE_PROJECT_ID}
        userName={user?.email}
        userSecret={user?.uid}
        renderNewMessageForm={() => <MessageFormSocial />}
        offset={Math.abs(timeZoneOffSet)}
      />
    </>
  );
};

export default ChatRoom;

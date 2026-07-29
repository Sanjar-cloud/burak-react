import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import type { T } from "../../../lib/types/common";
import { useState } from "react";
import type { MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

const modalSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperSx = {
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 5,
  p: 2,
};

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");

  /**  handlers **/

  const handleUsername = (e: T) => {
    console.log(e.target.value);
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
     if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
     }
  }

  const handleSignupRequest = async () => {
  try {
    console.log("inputs:", memberNick, memberPhone, memberPassword);
    const isFulfill =
      memberNick !== "" && memberPhone !== "" && memberPassword !== "";
    if (!isFulfill) throw new Error(Messages.error3);

    const signupInput: MemberInput = {
      memberNick: memberNick,
      memberPhone: memberPhone,
      memberPassword: memberPassword,
    };

    const member = new MemberService();
    const result = await member.signup(signupInput);

    handleSignupClose();
  } catch (err) {
    console.log(err);
     handleSignupClose();
    sweetErrorHandling(err).then();
  }
};


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={modalSx}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={signupOpen}>
          <Stack sx={paperSx} direction={"row"} width={"800px"}>
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField sx={{ marginTop: "7px" }} id="outlined-basic" label="username" variant="outlined" 
              onChange={handleUsername}
              />
              <TextField sx={{ my: "17px" }} id="outlined-basic" label="phone number" variant="outlined" 
              onChange={handlePhone}
              />
              <TextField id="outlined-basic" label="password" variant="outlined"
              onChange={handlePassword}
              onKeyDown={handlePasswordKeyDown}
               />
              <Fab sx={{ marginTop: "30px", width: "120px" }} variant="extended" color="primary"
              onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={modalSx}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={loginOpen}>
          <Stack sx={paperSx} direction={"row"} width={"700px"}>
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ marginLeft: "65px", marginTop: "25px", alignItems: "center" }}>
              <h2>Login Form</h2>
              <TextField id="outlined-basic" label="username" variant="outlined" sx={{ my: "10px" }} />
              <TextField id={"outlined-basic"} label={"password"} variant={"outlined"} type={"password"} />
              <Fab sx={{ marginTop: "27px", width: "120px" }} variant={"extended"} color={"primary"}>
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}

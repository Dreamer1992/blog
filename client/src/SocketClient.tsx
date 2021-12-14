import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { IComment } from "./types/CommentTypes";
import {
	CREATE_COMMENT,
	CREATE_REPLY_COMMENT,
	DELETE_COMMENT,
	DELETE_REPLY_COMMENT,
	UPDATE_COMMENT,
	UPDATE_REPLY_COMMENT,
} from "./redux/types/commentType";

const SocketClient = () => {
	const { socket } = useTypedSelector(state => state);
	const dispatch = useDispatch();

	// Create comment
	useEffect(() => {
		if (!socket) return;

		socket.on("createComment", (data: IComment) => {
			dispatch({ type: CREATE_COMMENT, payload: data });
		});

		return () => {
			socket.off("createComment");
		};
	}, [socket, dispatch]);

	// Create reply comment
	useEffect(() => {
		if (!socket) return;

		socket.on("createReplyComment", (data: IComment) => {
			dispatch({ type: CREATE_REPLY_COMMENT, payload: data });
		});

		return () => {
			socket.off("createReplyComment");
		};
	}, [socket, dispatch]);

	// Update comment
	useEffect(() => {
		if (!socket) return;

		socket.on("updateComment", (data: IComment) => {
			dispatch({
				type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
				payload: data,
			});
		});

		return () => {
			socket.off("updateComment");
		};
	}, [socket, dispatch]);

	// Delete comment
	useEffect(() => {
		if (!socket) return;

		socket.on("deleteComment", (data: IComment) => {
			dispatch({
				type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
				payload: data,
			});
		});

		return () => {
			socket.off("deleteComment");
		};
	}, [socket, dispatch]);

	return (
		<div>

		</div>
	);
};

export default SocketClient;
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootStore } from "../types/Types";

export const useTypedSelector: TypedUseSelectorHook<RootStore> = useSelector;

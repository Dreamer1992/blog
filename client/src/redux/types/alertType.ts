export const ALERT = 'ALERT';

export interface IAlert {
	loading?: boolean;
	success?: string | string[];
	errors?: string | string[];
}

export interface IAlertAction {
	type: typeof ALERT;
	payload: IAlert;
}

export type AlertType = IAlertAction;

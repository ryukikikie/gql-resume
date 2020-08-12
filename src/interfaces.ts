export interface BioInterface {
	name: string;
	tagline: string;
	email: string;
	github: string;
	linkedin: string;
}
export interface PositionInterface {
	id: string;
	title: string;
	startDate: string;
	endDate?: string;
	location: string;
	achievements: string[];
}

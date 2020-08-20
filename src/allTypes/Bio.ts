import { objectType } from "@nexus/schema";

export const Bio = objectType({
	name: "Bio",
	definition(t) {
		t.string("name");
		t.string("tagline");
		t.string("email");
		t.url("github", (bio) => new URL(bio.github));
		t.url("linkedin", (bio) => new URL(bio.linkedin));
		t.url("medium", (bio) => new URL(bio.medium));
	},
});

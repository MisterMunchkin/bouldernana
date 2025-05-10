import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import { COLORS } from "@/constants/colors.const";

const config = resolveConfig(tailwindConfig);

export class TailwindUtil {
	static getColor(key: keyof (typeof config)["theme"]["colors"]) {
		return config.theme.colors[key];
	}
	static getCoreColor(key: keyof (typeof COLORS)["core"]) {
		return COLORS.core[key];
	}
}

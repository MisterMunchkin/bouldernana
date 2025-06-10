import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import { COLORS } from "@/constants/colors.const";

const config = resolveConfig(tailwindConfig);

type CoreColorName = keyof typeof COLORS.core;
type ShadeKey = keyof (typeof COLORS.core)[CoreColorName];

type ColorPath = `${CoreColorName}.${ShadeKey}`;

export class TailwindUtil {
	static getColor(key: keyof (typeof config)["theme"]["colors"]) {
		return config.theme.colors[key];
	}
	static getCoreColor(key: ColorPath) {
		const [colorPath, shadePathProps] = key.split(".") as [
			CoreColorName,
			ShadeKey
		];
		const color = COLORS.core[colorPath];

		if (!color) {
			console.warn(`Color ${colorPath} not found in core colors.`);
			throw new Error(`Color ${colorPath} not found in core colors.`);
		}

		return color[shadePathProps];
	}
}

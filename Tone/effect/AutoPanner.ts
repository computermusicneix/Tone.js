import { Panner } from "../component/channel/Panner";
import { optionsFromArguments } from "../core/util/Defaults";
import { LFOEffect, LFOEffectOptions } from "./LFOEffect";
import { Frequency } from "../core/type/Units";

export type AutoPannerOptions = LFOEffectOptions;

/**
 * AutoPanner is a [[Panner]] with an [[LFO]] connected to the pan amount. 
 * [Related Reading](https://www.ableton.com/en/blog/autopan-chopper-effect-and-more-liveschool/).
 *
 * @example
 * // create an autopanner and start it
 * const autoPanner = new Tone.AutoPanner("4n").toDestination().start();
 * // route an oscillator through the panner and start it
 * const oscillator = new Tone.Oscillator().connect(autoPanner).start();
 * @category Effect
 */
export class AutoPanner extends LFOEffect<AutoPannerOptions> {

	readonly name: string = "AutoPanner";

	/**
	 * The filter node
	 */
	readonly _panner: Panner;

	/**
	 * @param frequency Rate of left-right oscillation. 
	 */
	constructor(frequency?: Frequency);
	constructor(options?: Partial<AutoPannerOptions>);
	constructor() {

		super(optionsFromArguments(AutoPanner.getDefaults(), arguments, ["frequency"]));

		this._panner = new Panner({ context: this.context });
		// connections
		this.connectEffect(this._panner);
		this._lfo.connect(this._panner.pan);
		this._lfo.min = -1;
		this._lfo.max = 1;
	}

	dispose(): this {
		super.dispose();
		this._panner.dispose();
		return this;
	}
}


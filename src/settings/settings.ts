import { SYSTEM } from "../config/system.ts";
import { MovementConfig } from "./movement-settings.ts";

export default function RegisterSystemSettings() {
  game.settings?.registerMenu(SYSTEM.id, SYSTEM.SETTINGS.MOVEMENT, {
      name: "SETTINGS.MOVEMENT.Name",
      label: "SETTINGS.MOVEMENT.Label",
      hint: "SETTINGS.MOVEMENT.Hint",
      icon: "fa-solid fa-person-walking",
      type: MovementConfig,
      restricted: true
  });
  game.settings?.register(SYSTEM.id, SYSTEM.SETTINGS.MOVEMENT, {
    name: "SETTINGS.MOVEMENT.Name",
    scope: "world",
    config: false,
    type: Object,
    default: {
      walk: 0,
      burrow: -5,
      flight: 0,
      leap: -2,
      swim: -2,
      teleport: 0
    }
  });
}

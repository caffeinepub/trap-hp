# Specification

## Summary
**Goal:** Build a single-page drag-racing themed calculator that estimates horsepower from vehicle weight and quarter-mile trap speed, showing the formula, units, and a clear results panel.

**Planned changes:**
- Create a centered single-page UI with inputs for vehicle weight (lb) and trap speed (mph), a Calculate button, and a displayed formula (HP = weight * (trapSpeed/234)^3).
- Add input validation with inline errors for empty/non-numeric/zero/negative values and enforce reasonable ranges (e.g., 1–20,000 lb; 1–400 mph); disable (or no-op) Calculate until valid.
- Implement the horsepower computation in a single Motoko backend actor as a query method; call it from the frontend via the generated canister actor.
- Add a results card showing estimated horsepower (rounded sensibly), echoing the input values, a short disclaimer, and a Reset/Clear action.
- Apply a consistent motorsport/drag-racing visual theme (dark asphalt style, high-contrast text, accent color not blue/purple) across layout and components.
- Add and reference generated static branding assets (logo/icon + subtle background) from `frontend/public/assets/generated`.

**User-visible outcome:** Users can enter weight and trap speed, validate inputs, calculate estimated horsepower via the backend, see a clear result explanation with the formula and disclaimer, and reset to start over in a drag-racing themed UI.

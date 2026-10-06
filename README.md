# Axiom-0 project page

A static research project page for **Axiom-0: Hierarchical Self-Refinement for Vision-Language-Action Policies**, by the 4Axiom Robotics Team.

## Included

- Responsive English project page, with no build step or external front-end dependencies.
- The original, unmodified v15 technical report PDF.
- Six selected side-by-side comparison videos, compressed for web delivery with H.264, original resolution and playback timing preserved.
- Three accessible video tabs: Atomic-Seen (2), Composite-Seen (2), Composite-Unseen (2).
- Official 4Axiom logo extracted unchanged from the supplied report; complete 18-model comparison, expanded by default.
- Architecture figure extracted from the supplied report, evaluation results, SRSI research direction, and Code marked Coming Soon.
- GitHub Pages deployment workflow.

## Publish on GitHub Pages

1. Create a GitHub repository, e.g. `Axiom-0`, under the intended personal or organization account.
2. Upload **the contents of this folder** to the repository root on the `main` branch. Include `assets/` and the hidden `.github/` directory.
3. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push the files or run **Deploy project page to GitHub Pages** from the **Actions** tab.
5. The successful deployment displays the project URL, usually `https://<account>.github.io/<repository>/`.

Alternative without Actions: select **Deploy from a branch**, choose **main** and **/(root)** in Settings → Pages. The `.nojekyll` file permits serving the static files directly.

All asset links are relative, so the page works under a repository subpath. No GitHub username, repository URL, or public release date has been invented.

## Local preview

From this folder run `python3 -m http.server 8000`, then open `http://localhost:8000`. You can also open `index.html` directly; the gallery data is embedded in `script.js` and does not require fetch requests.

## Edit

- `index.html`: visible page content and report links.
- `styles.css`: typography, colors, and responsive layout.
- `script.js`: video titles, groups, filenames, and tab behavior.
- `assets/report/Axiom0_v15_Report.pdf`: report linked from both report buttons.
- `assets/videos/`: web-ready MP4 files.
- `assets/posters/`: still frames used before playback.
- `assets/images/`: original report figure and report cover.

To release model code later, replace the non-clickable **Code / Coming Soon** badge with the real code repository link. The project-page source itself is not the model-code release.

## Scientific scope

Content follows the user-supplied v15 report dated October 5, 2026. Comparison scores refer to its October 3, 2026 leaderboard snapshot. Axiom-0 is identified as author-evaluated, pending independent benchmark verification; the page does not claim an official first-place ranking. The video overlay's generic `baseline` label is preserved without attributing it to a specific model not identified in the supplied video metadata.

The report is redistributed unchanged. The video clips retain the supplied 2× simulation speed, task descriptions, seeds, and outcome overlays. The selection is illustrative and is not used to calculate benchmark success rates.

## Complete task results

The task explorer includes all 50 tasks and 2,500 episode records from the supplied summary.json. Search, category filtering, success-rate sorting, and per-episode inspection are available. Downloadable CSV and JSON preserve results; the JSON excludes the original machine-local model path. The logged split remains `pretrain`; task category and environment split must not be conflated. Confirm the environment configuration before treating this log as independently verified official benchmark execution.

Task grouping reference: https://github.com/robocasa/robocasa/blob/main/robocasa/utils/dataset_registry.py

The selected atomic video now uses SlideDishwasherRack_seed659, replacing CloseBlenderLid_seed8. Both task results remain in the complete task explorer.

## Computational cost

The page includes all six metrics in report Table 3 and the profiling setup, with a direct link to Section 3.4 of the report. Complexity formulas and implementation explanations are left in the report. Values are transcribed from the supplied report, including its parameter increment precision.

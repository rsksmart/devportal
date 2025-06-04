# 🛠️ Translation Workflow Finalization Guide

To finalize translations, follow this step-by-step process:

## 1. Work in the `feature/i18n` Branch
All translation-related updates should be made in the `feature/i18n` branch.

## 2. Merge Updates from `main`
Periodically merge changes from the `main` branch into `feature/i18n` to keep your branch up to date:
```bash
git checkout feature/i18n
git pull origin main
```

## 3. Push to GitHub
Push changes in `feature/i18n` to GitHub:
```bash
git push origin feature/i18n
```
This will automatically upload updated localization files to **Crowdin**.

## 4. Translate in Crowdin
Go to the [Crowdin project](https://crowdin.com/project/rootstock-documentation) and complete the necessary translations.

## 5. Download Translations
After completing the translations, run the following command to download them locally:
```bash
crowdin download translations -l=es-ES
```
Replace `es-ES` with the desired locale code if needed.

## 6. Build the Project
Run the build to ensure the new translations don’t cause any issues:
```bash
yarn build
# or
yarn start
```

## 7. Fix Issues if Needed
If the build fails or something breaks:
- Fix the issue in the code.
- Commit and push the fix to the `feature/i18n` branch.

---

Stay in sync with `main`, keep Crowdin updated, and validate builds regularly to ensure a smooth localization process.

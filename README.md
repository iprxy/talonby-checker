# talonby-checker

Сheck available slots on talon.by by doctor id (you can find id in url https://talon.by/policlinic/klinika-merci/doctors/{DOCTOR_ID})

The check occurs using GitHub action. You can configure checking time in `.github/workflows/check.yml`

##Getting started:

1. Fork this repository
2. Set up repository secrets `settings/secred-actions`:

- **BOT_TOKEN**: telegram bot token
- **DOCTOR_ID**: doctor id
- **TG_USER_ID**: your telegram user_id
- **TOKEN**: github api token with access to update repository variables

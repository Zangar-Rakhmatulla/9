# Liquidity Vault (неделя 8, РК1)

Каркас vault-программы на Solana (Anchor 1.2.0). Денег пока нет, только структура аккаунтов.
Программа владеет всеми аккаунтами через PDA, поэтому администратор не может забрать токены своей подписью.

## Адреса в devnet

| Что | Адрес |
|---|---|
| Программа | [AUov6zy...jBRv](https://explorer.solana.com/address/AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv?cluster=devnet) |
| Токен (mint) | [5pTPEE3...rMKG](https://explorer.solana.com/address/5pTPEE31RcmUqmFJw57k17rGx6mBTvbYJUqRGZ4erMKG?cluster=devnet) |
| Vault (настройки, PDA) | [HyxdbjC...7mjK](https://explorer.solana.com/address/HyxdbjCrUaU6JSdNKVvNWNJmgr7J7FCkQCgb8Hut7mjK?cluster=devnet) |
| Share-токен (PDA) | [HVt9UCk...Qp9W](https://explorer.solana.com/address/HVt9UCkQ7aVgujdvgW5rs4x32Ckr9xEeZMqjKSNLQp9W?cluster=devnet) |
| Хранилище токенов (PDA) | [EUTxbHc...iiV](https://explorer.solana.com/address/EUTxbHc2DhM9h79V8B6seSYLkkoBNmWR1YsqWzfaFiiV?cluster=devnet) |
| Карточка пользователя (PDA) | [CdeERQm...jqn](https://explorer.solana.com/address/CdeERQm9Z2VfTFMsqMHDwEXBsnGdmKGZDV2faR8Bijqn?cluster=devnet) |

Транзакции:
- [create vault (initialize_vault)](https://explorer.solana.com/tx/441DvL11gFcNrz1EiPA3faHCWpYYBrE1TgJQwinZk1T6o9j1TRrHCnG9yfEvNB81RQJ3RGLy951RMXfKFKssUpLB?cluster=devnet)
- [open position (open_position)](https://explorer.solana.com/tx/4uTg8hUCL58XGHmmrSxoWFEfSkucMFM7g7if3Lm548vd3UQFcjvccVNzjioSsQVNJycZ36RXy3QJetMNQ6QzqvsE?cluster=devnet)

## Схема аккаунтов

| Аккаунт | Что хранит | Кто владеет | Seeds |
|---|---|---|---|
| Vault | admin, token mint, share mint, vault token, total_deposited, bump | Программа | `["vault", token_mint]` |
| Share mint | share-токен (квитанция) | mint authority = Vault PDA | `["share_mint", vault]` |
| Vault token account | внесённые токены | owner = Vault PDA | `["vault_token", vault]` |
| UserPosition | owner, vault, deposited, bump | Программа | `["position", vault, user]` |
cd ~/liquidity_vault

cat > README.md << 'EOF'
# Liquidity Vault (неделя 8, РК1)

Каркас vault-программы на Solana (Anchor 1.2.0). Денег пока нет, только структура аккаунтов.
Программа владеет всеми аккаунтами через PDA, поэтому администратор не может забрать токены своей подписью.

## Адреса в devnet

| Что | Адрес |
|---|---|
| Программа | [AUov6zy...jBRv](https://explorer.solana.com/address/AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv?cluster=devnet) |
| Токен (mint) | [5pTPEE3...rMKG](https://explorer.solana.com/address/5pTPEE31RcmUqmFJw57k17rGx6mBTvbYJUqRGZ4erMKG?cluster=devnet) |
| Vault (настройки, PDA) | [HyxdbjC...7mjK](https://explorer.solana.com/address/HyxdbjCrUaU6JSdNKVvNWNJmgr7J7FCkQCgb8Hut7mjK?cluster=devnet) |
| Share-токен (PDA) | [HVt9UCk...Qp9W](https://explorer.solana.com/address/HVt9UCkQ7aVgujdvgW5rs4x32Ckr9xEeZMqjKSNLQp9W?cluster=devnet) |
| Хранилище токенов (PDA) | [EUTxbHc...iiV](https://explorer.solana.com/address/EUTxbHc2DhM9h79V8B6seSYLkkoBNmWR1YsqWzfaFiiV?cluster=devnet) |
| Карточка пользователя (PDA) | [CdeERQm...jqn](https://explorer.solana.com/address/CdeERQm9Z2VfTFMsqMHDwEXBsnGdmKGZDV2faR8Bijqn?cluster=devnet) |

Транзакции:
- [create vault (initialize_vault)](https://explorer.solana.com/tx/441DvL11gFcNrz1EiPA3faHCWpYYBrE1TgJQwinZk1T6o9j1TRrHCnG9yfEvNB81RQJ3RGLy951RMXfKFKssUpLB?cluster=devnet)
- [open position (open_position)](https://explorer.solana.com/tx/4uTg8hUCL58XGHmmrSxoWFEfSkucMFM7g7if3Lm548vd3UQFcjvccVNzjioSsQVNJycZ36RXy3QJetMNQ6QzqvsE?cluster=devnet)

## Схема аккаунтов

| Аккаунт | Что хранит | Кто владеет | Seeds |
|---|---|---|---|
| Vault | admin, token mint, share mint, vault token, total_deposited, bump | Программа | `["vault", token_mint]` |
| Share mint | share-токен (квитанция) | mint authority = Vault PDA | `["share_mint", vault]` |
| Vault token account | внесённые токены | owner = Vault PDA | `["vault_token", vault]` |
| UserPosition | owner, vault, deposited, bump | Программа | `["position", vault, user]` |

cd ~/liquidity_vault

cat > README.md << 'EOF'
# Liquidity Vault (неделя 8, РК1)

Каркас vault-программы на Solana (Anchor 1.2.0). Денег пока нет, только структура аккаунтов.
Программа владеет всеми аккаунтами через PDA, поэтому администратор не может забрать токены своей подписью.

## Адреса в devnet

| Что | Адрес |
|---|---|
| Программа | [AUov6zy...jBRv](https://explorer.solana.com/address/AUov6zyDFS4R86PtEMxeikWXfXAc5j6pHxXtZcPkjBRv?cluster=devnet) |
| Токен (mint) | [5pTPEE3...rMKG](https://explorer.solana.com/address/5pTPEE31RcmUqmFJw57k17rGx6mBTvbYJUqRGZ4erMKG?cluster=devnet) |
| Vault (настройки, PDA) | [HyxdbjC...7mjK](https://explorer.solana.com/address/HyxdbjCrUaU6JSdNKVvNWNJmgr7J7FCkQCgb8Hut7mjK?cluster=devnet) |
| Share-токен (PDA) | [HVt9UCk...Qp9W](https://explorer.solana.com/address/HVt9UCkQ7aVgujdvgW5rs4x32Ckr9xEeZMqjKSNLQp9W?cluster=devnet) |
| Хранилище токенов (PDA) | [EUTxbHc...iiV](https://explorer.solana.com/address/EUTxbHc2DhM9h79V8B6seSYLkkoBNmWR1YsqWzfaFiiV?cluster=devnet) |
| Карточка пользователя (PDA) | [CdeERQm...jqn](https://explorer.solana.com/address/CdeERQm9Z2VfTFMsqMHDwEXBsnGdmKGZDV2faR8Bijqn?cluster=devnet) |

Транзакции:
- [create vault (initialize_vault)](https://explorer.solana.com/tx/441DvL11gFcNrz1EiPA3faHCWpYYBrE1TgJQwinZk1T6o9j1TRrHCnG9yfEvNB81RQJ3RGLy951RMXfKFKssUpLB?cluster=devnet)
- [open position (open_position)](https://explorer.solana.com/tx/4uTg8hUCL58XGHmmrSxoWFEfSkucMFM7g7if3Lm548vd3UQFcjvccVNzjioSsQVNJycZ36RXy3QJetMNQ6QzqvsE?cluster=devnet)

## Схема аккаунтов

| Аккаунт | Что хранит | Кто владеет | Seeds |
|---|---|---|---|
| Vault | admin, token mint, share mint, vault token, total_deposited, bump | Программа | `["vault", token_mint]` |
| Share mint | share-токен (квитанция) | mint authority = Vault PDA | `["share_mint", vault]` |
| Vault token account | внесённые токены | owner = Vault PDA | `["vault_token", vault]` |
| UserPosition | owner, vault, deposited, bump | Программа | `["position", vault, user]` |

Связи:
- admin вызывает initialize_vault и создаёт Vault PDA.
- Vault PDA является authority для Share mint и для Vault token account.
- user вызывает open_position и создаёт свою UserPosition PDA (адрес считается из vault и user).

## Действия

1. `initialize_vault`: один раз создаёт настройки vault, share-токен и хранилище.
2. `open_position`: пользователь создаёт свою карточку. Адрес вычисляется из адреса vault и пользователя, поэтому список пользователей хранить не нужно.

## Запуск

Команды: `anchor build`, `anchor program deploy`, затем в папке scripts: `npm install`, `npx tsx init-vault.ts`, `npx tsx open-position.ts`.

Ключи и seed-фразы в репозиторий не добавляются: скрипты читают кошелёк из `~/.config/solana/id.json`.

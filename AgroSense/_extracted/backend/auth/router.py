from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from .models import LoginRequest, TwoFARequest, LoginResponse, UserPublic, Token
from .utils import verify_password, create_access_token, decode_token
from data.mock_data import USERS_DB

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Código 2FA fixo para demo (em produção: TOTP com pyotp)
DEMO_2FA_CODE = "123456"


def get_user(email: str):
    return USERS_DB.get(email.lower())


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    user = get_user(body.email)
    if not user or not verify_password(body.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
        )
    # Retorna step=2fa — o frontend exibirá o campo de código
    return LoginResponse(
        step="2fa",
        message="Código 2FA enviado para seu autenticador.",
    )


@router.post("/verify-2fa", response_model=LoginResponse)
def verify_2fa(body: TwoFARequest):
    user = get_user(body.email)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    if body.code.strip() != DEMO_2FA_CODE:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código 2FA inválido. Use 123456 para o ambiente demo.",
        )

    token = create_access_token({
        "sub": user["email"],
        "perfil": user["perfil"],
        "empresa": user["empresa"],
        "permissoes": user["permissoes"],
    })

    return LoginResponse(
        step="done",
        token=token,
        user=UserPublic(**{k: v for k, v in user.items() if k != "hashed_password"}),
        message="Login realizado com sucesso.",
    )


@router.get("/me", response_model=UserPublic)
def get_me(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado.")
    user = get_user(payload.get("sub", ""))
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return UserPublic(**{k: v for k, v in user.items() if k != "hashed_password"})


@router.post("/logout")
def logout():
    # JWT é stateless — o frontend descarta o token
    return {"message": "Logout realizado. Descarte o token no cliente."}

"""
[인증(로그인) 라우터]
사용자 인증과 관련된 API를 처리합니다.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database

# 라우터 설정 (URL 프리픽스: /auth)
router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/login")
def login(dto: schemas.LoginDto, db: Session = Depends(database.get_db)):
    """
    [로그인 API]
    PIN 코드를 받아 사용자를 인증하고 사용자 정보를 반환합니다.
    """
    # 1. DB에서 PIN 코드가 일치하는 사용자 검색
    user = db.query(models.UserDB).filter(models.UserDB.pinCode == dto.pinCode).first()
    
    # 2. 사용자가 없으면 401 Unauthorized 에러 반환
    if not user:
        raise HTTPException(status_code=401, detail="비밀번호가 일치하지 않습니다.")
        
    # 3. 로그인 성공 시 사용자 정보 반환
    return {"success": True, "user": user}

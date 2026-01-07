"""
[계좌 및 거래내역 라우터]
계좌 정보 조회와 거래 내역 리스트 조회 기능을 담당합니다.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

router = APIRouter(
    prefix="/accounts",
    tags=["accounts"]
)

@router.get("/main", response_model=schemas.UserResponse)
def get_main_account(db: Session = Depends(database.get_db)):
    """
    [메인 계좌 조회]
    로그인한 사용자의 대표 계좌 정보를 조회합니다. (현재는 데모용으로 첫 번째 사용자 반환)
    """
    user = db.query(models.UserDB).first()
    if not user:
        raise HTTPException(status_code=404, detail="Account not found")
    return user

@router.get("/{account_id}/transactions", response_model=List[schemas.TransactionResponse])
def get_transactions(account_id: str, db: Session = Depends(database.get_db)):
    """
    [거래 내역 조회]
    특정 계좌의 모든 거래 내역을 최신순으로 반환합니다.
    """
    return db.query(models.TransactionDB)\
             .filter(models.TransactionDB.accountId == account_id)\
             .order_by(models.TransactionDB.transactedAt.desc())\
             .all()

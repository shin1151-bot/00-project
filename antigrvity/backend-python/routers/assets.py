"""
[자산 라우터]
사용자의 투자 자산(주식, 코인 등) 목록을 조회합니다.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

router = APIRouter(
    tags=["assets"]
)

@router.get("/assets", response_model=List[schemas.AssetResponse])
def get_assets(db: Session = Depends(database.get_db)):
    """
    [자산 목록 조회]
    DB에 저장된 모든 자산 항목을 반환합니다.
    """
    return db.query(models.AssetDB).all()

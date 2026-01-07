"""
이미지 업스케일링 프로그램

이 프로그램은 OpenCV의 DNN Super Resolution 모듈을 사용하여
이미지 해상도를 4배로 높이는 AI 기반 업스케일링을 수행합니다.
EDSR (Enhanced Deep Super-Resolution) 모델을 사용합니다.

사용법:
1. EDSR_x4.pb 모델 파일을 스크립트와 같은 폴더에 놓으세요.
2. INPUT_FOLDER와 OUTPUT_FOLDER를 원하는 경로로 설정하세요.
3. python image.py 명령어로 실행하세요.

요구사항:
- opencv-python
- EDSR_x4.pb 모델 파일

작성자: AI Assistant
날짜: 2026년 1월 4일
"""

# 필요한 모듈 임포트
import cv2  # OpenCV 라이브러리: 이미지 처리 및 AI 모델 로딩에 사용
import os  # 운영체제 인터페이스: 파일/폴더 존재 확인, 폴더 생성에 사용
from pathlib import Path  # 경로 처리: 파일 경로 조작에 사용
import time  # 시간 측정: 처리 시간 계산에 사용
import numpy as np  # NumPy: 이미지 데이터 처리에 사용
import shutil  # 파일 복사: 모델 파일 임시 복사에 사용

# ==========================================
# [설정 영역] 사용자 설정 변수들
# ==========================================

# 입력 폴더 경로: 업스케일링할 이미지들이 있는 폴더
INPUT_FOLDER = r"C:\Users\user\Desktop\slide"

# 출력 폴더 경로: 업스케일링된 이미지들이 저장될 폴더
OUTPUT_FOLDER = r"C:\Users\user\Desktop\slide2"

# AI 모델 파일 경로: EDSR 모델 파일 (Enhanced Deep Super-Resolution)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "EDSR_x4.pb")  # 스크립트와 같은 폴더에 있어야 함

# 스케일 팩터: 이미지 해상도를 몇 배로 높일지 결정 (4배)
SCALE_FACTOR = 4

# 허용되는 이미지 파일 확장자들: 처리할 이미지 파일 형식
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.bmp', '.webp'}
# ==========================================

def run_upscale():
    """
    메인 업스케일링 함수

    이 함수는 입력 폴더의 모든 이미지를 AI 모델을 사용하여
    해상도를 높인 후 출력 폴더에 저장합니다.

    처리 과정:
    1. 출력 폴더 생성 확인
    2. AI 모델 로딩
    3. 입력 폴더에서 이미지 파일 검색
    4. 각 이미지에 대해 업스케일링 수행
    5. 결과 저장 및 진행 상황 출력

    반환값: 없음
    예외: 모델 파일이 없으면 함수 종료
    """
    # 1. 출력 폴더 존재 확인 및 생성
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)  # 출력 폴더가 없으면 새로 생성
        print(f"📂 새 폴더를 생성했어요: {OUTPUT_FOLDER}")

    # 2. AI 모델 파일 존재 확인
    if not os.path.exists(MODEL_PATH):
        print(f"❌ 모델 파일을 찾을 수 없어요! {MODEL_PATH} 파일을 확인해 주세요.")
        return  # 모델 파일이 없으면 함수 종료

    # AI 모델 로딩 시작 메시지
    print("🤖 AI 모델 로딩 중... 잠시만 기다려 주세요.")

    # OpenCV DNN Super Resolution 객체 생성
    sr = cv2.dnn_superres.DnnSuperResImpl_create()

    # 모델 파일을 임시로 복사 (공백 경로 문제 해결)
    temp_model = os.path.join(os.environ['TEMP'], "temp_model.pb")
    shutil.copy(MODEL_PATH, temp_model)

    # 모델 파일 로딩
    sr.readModel(temp_model)

    # 모델 설정: EDSR 알고리즘, 4배 스케일링
    sr.setModel("edsr", SCALE_FACTOR)

    # 모델 로딩 완료 메시지
    print("✅ 준비 완료! 작업을 시작합니다.")

    # 3. 입력 폴더에서 이미지 파일 목록 가져오기
    input_dir = Path(INPUT_FOLDER)  # Path 객체로 폴더 경로 생성
    # glob('*')으로 모든 파일 검색, 확장자 필터링
    files = [f for f in input_dir.glob('*') if f.suffix.lower() in ALLOWED_EXTENSIONS]

    # 총 파일 개수 계산
    total = len(files)
    print(f"📸 총 {total}개의 이미지를 찾았습니다.")

    # 4. 각 이미지 파일에 대해 업스케일링 수행
    for idx, file_path in enumerate(files, 1):
        start_time = time.time()  # 처리 시작 시간 기록
        print("✅ 준비 완료! 작업을 시작합니다.")
        print(f"[{idx}/{total}] 🔄 {file_path.name} 처리 중...", end="", flush=True)

        try:
            # 이미지 파일 읽기 (OpenCV 사용, 한글 경로 지원)
            img = cv2.imdecode(np.fromfile(str(file_path), dtype=np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                # 이미지 읽기 실패 시 다음 파일로 넘어감
                print(" -> ❌ 읽기 실패")
                continue

            # AI 모델을 사용하여 업스케일링 수행
            result = sr.upsample(img)

            # 저장 경로 생성: 원본 파일명에 '_up.png' 추가
            save_path = os.path.join(OUTPUT_FOLDER, f"{file_path.stem}_up.png")
            # 업스케일링된 이미지 저장
            cv2.imwrite(save_path, result)

            # 처리 시간 계산
            elapsed = time.time() - start_time
            print(f" -> ✅ 완료! ({elapsed:.1f}초)")

        except Exception as e:
            # 예외 발생 시 오류 메시지 출력
            print(f" -> ❌ 오류 발생: {e}")

    # 모든 작업 완료 메시지
    print(f"\n✨ 모든 작업이 끝났어요! '{OUTPUT_FOLDER}' 폴더를 확인해 보세요.")

    # 임시 모델 파일 삭제
    if os.path.exists(temp_model):
        os.remove(temp_model)

# 메인 실행 블록: 스크립트가 직접 실행될 때만 run_upscale() 호출
if __name__ == "__main__":
    run_upscale()
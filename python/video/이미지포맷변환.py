import os
import glob
from PIL import Image

# 설정
TARGET_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\00 input"
OUTPUT_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\Converted_Format"

def convert_image_format():
    print(f"=== 이미지 포맷 변환기 ===")
    print(f"대상 폴더: {TARGET_FOLDER}")
    
    # 변환할 타겟 포맷 입력 받기
    target_format = input("변환할 포맷을 입력하세요 (예: png, jpg, webp): ").lower().strip()
    if target_format not in ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'tiff']:
        print("지원하지 않거나 잘못된 포맷입니다.")
        return

    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    # 모든 이미지 파일 검색
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.bmp']
    image_files = []
    
    for ext in extensions:
        image_files.extend(glob.glob(os.path.join(TARGET_FOLDER, ext)))

    if not image_files:
        print("변환할 이미지 파일이 없습니다.")
        return

    print(f"\n발견된 이미지 ({len(image_files)}개). {target_format.upper()}로 변환 시작...")

    for img_path in image_files:
        filename = os.path.basename(img_path)
        name_without_ext = os.path.splitext(filename)[0]
        
        # 이미 해당 포맷인 경우 건너뛰기
        if filename.lower().endswith(f".{target_format}"):
            continue

        print(f"변환 중: {filename} -> {name_without_ext}.{target_format}...", end="")
        
        try:
            with Image.open(img_path) as img:
                # JPG 저장을 위해 RGB 모드로 변환 (투명도 제거)
                if target_format in ['jpg', 'jpeg'] and img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                save_path = os.path.join(OUTPUT_FOLDER, f"{name_without_ext}.{target_format}")
                
                if target_format in ['jpg', 'jpeg']:
                    img.save(save_path, quality=95)
                else:
                    img.save(save_path)
                    
            print(" [완료]")
            
        except Exception as e:
            print(f" [실패] {e}")

    print(f"\n모든 작업이 완료되었습니다.")
    print(f"저장 위치: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    convert_image_format()

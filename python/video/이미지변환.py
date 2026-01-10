import os
import glob
from PIL import Image, ImageEnhance

# 설정
# 설정
TARGET_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\00 input"
OUTPUT_FOLDER = r"C:\Users\user\Desktop\유튜브\이미지\Enhanced_Quality"

def enhance_image_quality():
    print(f"=== 이미지 선명도/화질 보정 (No Resize) ===")
    print(f"대상 폴더: {TARGET_FOLDER}")
    
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    # 지원하는 이미지 포맷
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp')
    image_files = []
    
    # glob 대신 os.listdir 사용 (더 안정적)
    try:
        all_files = os.listdir(TARGET_FOLDER)
        for f in all_files:
            if f.lower().endswith(valid_extensions):
                image_files.append(os.path.join(TARGET_FOLDER, f))
    except Exception as e:
        print(f"폴더 접근 중 오류 발생: {e}")
        return

    if not image_files:
        print("변환할 이미지 파일이 없습니다.")
        return

    print(f"\n발견된 이미지 ({len(image_files)}개). 보정 시작...")

    for img_path in image_files:
        filename = os.path.basename(img_path)
        print(f"처리 중: {filename}...", end="")
        
        try:
            with Image.open(img_path) as img:
                # 해상도 변경(Resize) 없이 화질만 개선
                # 1. 원본 크기 유지
                # 2. 선명도(Sharpness) 강화 (1.0 = 원본, 1.5 ~ 2.0 권장)
                # 3. 대비(Contrast) 미세 조정 (또렷함 증가)
                
                # 이미지 모드 변환 (보정 필터 적용 위해 RGB 변환 권장)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 선명도 보정
                enhancer_sharpness = ImageEnhance.Sharpness(img)
                enhanced_img = enhancer_sharpness.enhance(1.5)  # 1.5배 선명하게
                
                # 대비 보정 (선택 사항 - 인물 윤곽 뚜렷하게)
                enhancer_contrast = ImageEnhance.Contrast(enhanced_img)
                final_img = enhancer_contrast.enhance(1.1)      # 1.1배 대비 증가

                print(f" (선명도 1.5x, 대비 1.1x)", end="")
                
                # 저장
                save_path = os.path.join(OUTPUT_FOLDER, f"Enhanced_{filename}")
                # 확장자에 따라 저장 포맷 결정 (원본 유지)
                # JPEG의 경우 quality 옵션 추가
                if filename.lower().endswith(('.jpg', '.jpeg')):
                    final_img.save(save_path, quality=95)
                else:
                    final_img.save(save_path)
                    
            print(" [완료]")
            
        except Exception as e:
            print(f" [실패] {e}")

    print(f"\n모든 작업이 완료되었습니다.")
    print(f"저장 위치: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    enhance_image_quality()

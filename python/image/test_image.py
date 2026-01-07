import unittest
from unittest.mock import patch, MagicMock, call
import os
from pathlib import Path
import sys

# Mock the cv2 module before importing
sys.modules['cv2'] = MagicMock()

from image import run_upscale, INPUT_FOLDER, OUTPUT_FOLDER, MODEL_PATH



class TestRunUpscale(unittest.TestCase):
    
    @patch('image.os.path.exists')
    @patch('image.os.makedirs')
    def test_creates_output_folder_if_not_exists(self, mock_makedirs, mock_exists):
        mock_exists.side_effect = [False, True]
        with patch('image.Path'), patch('image.cv2.dnn_superres.DnnSuperResImpl_create'):
            run_upscale()
        mock_makedirs.assert_called_once_with(OUTPUT_FOLDER)
    
    @patch('image.os.path.exists')
    def test_returns_early_if_model_not_found(self, mock_exists):
        mock_exists.side_effect = [True, False]
        with patch('builtins.print'):
            run_upscale()
        self.assertEqual(mock_exists.call_count, 2)
    
    @patch('image.os.path.exists')
    @patch('image.cv2.dnn_superres.DnnSuperResImpl_create')
    @patch('image.Path')
    def test_loads_model_correctly(self, mock_path, mock_sr_create, mock_exists):
        mock_exists.return_value = True
        mock_sr = MagicMock()
        mock_sr_create.return_value = mock_sr
        mock_path.return_value.glob.return_value = []
        
        run_upscale()
        
        mock_sr.readModel.assert_called_once_with(MODEL_PATH)
        mock_sr.setModel.assert_called_once_with("edsr", 4)
    
    @patch('image.os.path.exists')
    @patch('image.cv2.dnn_superres.DnnSuperResImpl_create')
    @patch('image.Path')
    @patch('image.cv2.imread')
    @patch('image.cv2.imwrite')
    @patch('image.os.path.join', side_effect=lambda *args: '/'.join(args))
    def test_processes_images_correctly(self, mock_join, mock_imwrite, mock_imread, mock_path, mock_sr_create, mock_exists):
        mock_exists.return_value = True
        mock_sr = MagicMock()
        mock_sr_create.return_value = mock_sr
        mock_sr.upsample.return_value = MagicMock()
        
        test_file = MagicMock(spec=Path)
        test_file.name = "test.jpg"
        test_file.stem = "test"
        test_file.suffix = ".jpg"
        mock_path.return_value.glob.return_value = [test_file]
        
        mock_imread.return_value = MagicMock()
        
        run_upscale()
        
        mock_imread.assert_called_once()
        mock_sr.upsample.assert_called_once()
        mock_imwrite.assert_called_once()
    
    @patch('image.os.path.exists')
    @patch('image.cv2.dnn_superres.DnnSuperResImpl_create')
    @patch('image.Path')
    @patch('image.cv2.imread')
    def test_handles_unreadable_image(self, mock_imread, mock_path, mock_sr_create, mock_exists):
        mock_exists.return_value = True
        mock_sr_create.return_value = MagicMock()
        test_file = MagicMock(spec=Path)
        test_file.name = "test.jpg"
        test_file.suffix = ".jpg"
        mock_path.return_value.glob.return_value = [test_file]
        mock_imread.return_value = None
        
        run_upscale()
        
        mock_imread.assert_called_once()


if __name__ == '__main__':
    unittest.main()
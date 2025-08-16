import { Input } from '@/components/ui/input';
import { useState } from 'react';
import InputError from './InputError';

export function ImageUpload({ imagePath, onChangeImage, errorMessage }) {
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewUrl(reader.result);
			if (onChangeImage) onChangeImage(file, reader.result);
		};
		reader.readAsDataURL(file);
	};

	const getImageSrc = () => {
		if (previewUrl) return previewUrl;

		const fullPath = imagePath?.startsWith('http') ? imagePath : `${window.location.origin}/${imagePath}`;

		if (imagePath && fullPath !== `${window.location.origin}/storage/`) return fullPath;

		return `${window.location.origin}/assets/icon/default_image_profile.png`;
	};

	return (
		<div className="space-y-2">
			<Input type="file" accept="image/*" onChange={handleChange} className="h-10 dark:bg-[#1F1F1F]" />
			{errorMessage && <InputError message={errorMessage} className="mt-2 text-red-600" />}
			<img
				src={getImageSrc()}
				alt="Preview"
				className="group relative h-auto w-full rounded-lg border object-cover md:h-auto md:w-60"
			/>
		</div>
	);
}

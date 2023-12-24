import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import {
  Counter,
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
  Captions,
} from "yet-another-react-lightbox/plugins";
import { LanguageDirection, defaultLang } from "../../../utils/Helpers/General";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const LightboxComponent = ({
	slides,
	lightbox,
	setLightbox,
	pathname = '<object>.image',
}) => {
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Refs
	const thumbnailsRef = useRef(null);
	const slideshowRef = useRef(null);
	const fullscreenRef = useRef(null);
	const zoomRef = useRef(null);
	const captionsRef = useRef(null);

	return (
		<Lightbox
			plugins={[Thumbnails, Counter, Slideshow, Fullscreen, Zoom, Captions]}
			open={lightbox.isOpen}
			close={() =>
				setLightbox({
					isOpen: !lightbox.isOpen,
					index: 0,
				})
			}
			index={lightbox.index}
			slides={slides?.map((slide, index) => ({
				type: 'image',
				src: pathname.includes('.image')
					? slide?.image
					: pathname.includes('.path')
					? slide?.path
					: slide,
				alt: `image #${index}`,
				imageFit: 'contain',
				title: slide.hasOwnProperty("name") ? slide?.name : slide?.title,
			}))}
			counter={{
				style: {
					left: lang === 'en' ? 0 : 'unset',
					right: lang === 'en' ? 'unset' : 0,
					bottom: 0,
					top: 'unset',
				},
			}}
			thumbnails={{
				ref: thumbnailsRef,
				showToggle: true,
				imageFit: 'cover',
			}}
			slideshow={{
				ref: slideshowRef,
				autoplay: false,
				delay: 2000,
			}}
			fullscreen={{ ref: fullscreenRef }}
			zoom={{ ref: zoomRef, scrollToZoom: true }}
			captions={{ ref: captionsRef, showToggle: true }}
			on={{
				click: () => {
					// Thumbnail
					(thumbnailsRef.current?.visible
						? thumbnailsRef.current?.hide
						: thumbnailsRef.current?.show)?.();

					// Slideshow
					(slideshowRef.current?.playing
						? slideshowRef.current?.pause
						: slideshowRef.current?.play)?.();

					// Fullscreen
					fullscreenRef.current?.enter();

					// Zoom
					zoomRef.current?.zoomIn();

					// Captions
					(captionsRef.current?.visible
						? captionsRef.current?.hide
						: captionsRef.current?.show)?.();
				},
			}}
		/>
	);
};

export default LightboxComponent;


import './Icon.scss?v=1.1.2';

//import Image from 'next/image';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckIcon from '@mui/icons-material/Check';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ContactsIcon from '@mui/icons-material/Contacts';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CircleIcon from '@mui/icons-material/Circle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const map: any = {
	'file': '/icons/file.svg',
};

export default function Icon(attrs: any) {
	let src = attrs.src; if (!attrs.src) return null;

	if (map[src]) src = map[src];

	return (
		<i
			className={`icon ${attrs.className || ''}`.trim()}
			data-src={src}
			style={{
				display: 'inline-block',
				...attrs.style,
			}}
		>
			{
				(() => {

					if (src.includes('/')) return <img
						src={src}
						alt={attrs.alt || 'Image'}
						width={attrs.width || 25}
						height={attrs.height || 25}
					/>;

					else if (src === 'linkedin') return <LinkedInIcon />;
					else if (src === 'facebook') return <FacebookIcon />;
					else if (src === 'instagram') return <InstagramIcon />;
					else if (src === 'x') return <XIcon />;
					else if (src === 'twitter') return <TwitterIcon />;
					else if (src === 'email') return <EmailIcon />;
					else if (src === 'github') return <GitHubIcon />;
					else if (src === 'youtube') return <YouTubeIcon />;
					else if (src === 'launch') return <LaunchIcon />;
					else if (src === 'check') return <CheckIcon />;
					else if (src === 'plumbing') return <PlumbingIcon />;
					else if (src === 'contacts') return <ContactsIcon />;
					else if (src === 'menu') return <MenuIcon />;
					else if (src === 'info') return <InfoIcon />;
					else if (src === 'home') return <HomeIcon />;
					else if (src === 'engineer') return <EngineeringIcon />;
					else if (src === 'awesome') return <AutoAwesomeIcon />;
					else if (src === 'smart') return <TipsAndUpdatesIcon />;
					else if (src === 'keyboard-arrow-right') return <KeyboardArrowRightIcon />;
					else if (src === 'arrow-drop-down') return <ArrowDropDownIcon />;
					else if (src === 'circle') return <CircleIcon />;

					else return <CircleIcon />;

				})()
			}
		</i>
	);
}

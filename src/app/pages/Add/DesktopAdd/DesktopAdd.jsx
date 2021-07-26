import { memo } from 'react';
import {
	BasicFields,
	DescriptionEditor,
	ImageUpload,
	AutofillManager,
} from '../components';
import { Card } from '../../../components';
import { useAddForm } from '../controllers';
import cn from './DesktopAdd.module.scss';

/**
 * Component uses {id} variable passed in from URL parameter to distinguish
 * between edit and add pages
 */
const DesktopAdd = () => {
	const {
		disabled,
		form,
		id,

		setForm,
		editForm,
		handleChange,
		submit,
	} = useAddForm();

	return (
		<div className={cn.container}>
			<main>
				<header>
					<h1 className={cn.title}>
						{id ? 'EDIT' : 'ADD'} A PURCHASE
					</h1>
				</header>
				<form onSubmit={submit} className={cn['form-container']}>
					<fieldset disabled={disabled} className={cn['layout']}>
						<div className={cn.left}>
							<Card className={cn.fields} title='details'>
								<BasicFields
									form={form}
									editForm={editForm}
									handleChange={handleChange}
								/>
							</Card>
							<Card className={cn.upload} title='photo'>
								<ImageUpload
									className={cn.state}
									image={form.image}
									setImage={link => editForm('image', link)}
								/>
							</Card>
						</div>
						<div className={cn.right}>
							<Card
								className={cn.description}
								title='description'
							>
								<DescriptionEditor
									description={form.description ?? ''}
									setDescription={val =>
										editForm('description', val, 2500)
									}
								/>
							</Card>
							<button>{id ? 'UPDATE' : 'ADD'}</button>
						</div>
					</fieldset>
				</form>
			</main>
			<aside>
				<h2>saved drinks</h2>
				<p>
					You can save your favorite drink to make recording them
					easier! Just fill out the form with the fields you want
					saved and click{' '}
					<b style={{ whiteSpace: 'nowrap' }}>[+ Create]</b> below
					before adding.
				</p>
				<AutofillManager form={form} setForm={setForm} />
			</aside>
		</div>
	);
};

export default memo(DesktopAdd);

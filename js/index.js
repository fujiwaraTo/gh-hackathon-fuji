(function($) {
	var reportController = {
		__name: 'handson.ReportController',

		__ready: function() {
			this.$find('input[name="reportDate"]').val(
				handson.utils.formatDateWithHyphen(new Date())
			);
			this.$find('input[name="startTime"]').val('09:00');
			this.$find('input[name="endTime"]').val(
				handson.utils.formatTime(new Date())
		  );
		},

		
		'input, textarea focusout': function(context, $el) {
			// �ϐ��̒�`
			var value = $el.val();  // ���͂��ꂽ�l
			var name = $el.attr('name');  // ���͂����ꏊ�̖��O
			var error_class  = 'has-error';  // �G���[�p�N���X
			var $msg = this.$find('.report-content').find('.msg');  // ���b�Z�[�W���o���ꏊ
			var $formGroup = $el.parents('.form-group');  // �G���[�p�N���X��ǉ�����ꏊ
			
			// ���O�����̐ݒ�
			if (name == 'img') {
				return;
			}

			// ���̓`�F�b�N
			if (value == null || value == '') {
				// ���͂���Ă��Ȃ��ꍇ�̏���
				if ($formGroup.hasClass(error_class)) {
					// ���łɃG���[�\��������Ȃ�Ή������Ȃ�
					return;
				}
				// ��̓��͍��ڂɐԂ��g��ǉ�
				$formGroup.addClass(error_class);

				// ���͍��ږ��i���{��j���擾
				var label = $formGroup.find('label').text();

				// ���b�Z�[�W�̑g�ݗ���
				var $p = $('<p data-handson-input-name="' + name + '">');
				$p.append('<strong>' + label + '����͂��Ă�������' + '</strong>');
				// �G���[���b�Z�[�W�̑}��
				$msg.append($p);
				
			} else {
				// ���͂���Ă���ꍇ�̏���
				// �G���[�̘g���O��
				$formGroup.removeClass(error_class);

				// ���͂������ڂ̃��b�Z�[�W������
				$msg.find('p[data-handson-input-name="' + name + '"]').remove();
			}

			// ���b�Z�[�W�̕\���A��\���̎w��
			if ($msg.children().length != 0) {
				// �G���[����
				$msg.show();
			} else {
				// �G���[�Ȃ�
				$msg.hide();
			}

		},

		'input[name="img"] change': function(context, $el) {
			// �ϐ��̒�`
			var $imgPreview = this.$find('.img-preview');
			
			// input�v�f����t�@�C�����擾
			var file = $el[0].files[0];
			
			// FileReader�C���X�^���X�̍쐬
			var reader = new FileReader();
			
			// �t�@�C�����ǂݍ��܂ꂽ���̏������L�q
			reader.onload = function(e) {
				// �摜��\��
				$imgPreview.find('img').attr('src', e.target.result);
				$imgPreview.show();
			};
			// �t�@�C���ǂݍ��݊J�n
			reader.readAsDataURL(file);
		},

		'.confirm click': function(context, $el) {
		  // ������
		  context.event.preventDefault();

		  // �p�����[�^�̐ݒ�
		  var params = {};
		  var ary = this.$find('form').serializeArray();
		  for (i in ary) {
		    params[ary[i].name] = ary[i].value;
		  }
		  
		  // �����s�Ή����̃G�X�P�[�v����
		  params.comment = h5.u.str.escapeHtml(params.comment)
		  
		  // �r���[�̐ݒ�
		  this.view.update('.modal-content', 'confirm', params);
		  
		  // ���[�_���\��
		  this.$find('#confirmModal').modal();
		},

		'.register click': function(context, $el) {
		  // Ajax�̋[���I���s
		  h5.ajax({
		    type: 'post',
		    data: this.$find('form').serialize(),
		    url: '/register'
		  }).then(function() {
		    alert('�o�^���܂���');
		    this.$find('#confirmModal').modal('hide');
		  })
		}
	};
	
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	h5.core.controller(document.body, handson.ReportController);
});

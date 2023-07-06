(($) => {
  $(() => {
    $(document).on('click', '.c_b', copyMessage);
  });

  /**
   * Code to copy strings from the copy buttons
   * @return {none} none
   */
  const copyMessage = function() {
    const $input = $(this).find('input')[0];
    $input.select();

    navigator.clipboard.writeText($input.value)
      .then(() => {
        let $text = $(this).find('span').text();
        $(this).find('span').text('Link Copied!');
        setTimeout(() => {
          $(this).find('span').text($text);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };
})(jQuery);


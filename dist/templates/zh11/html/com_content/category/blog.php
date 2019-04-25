<?php defined ( '_JEXEC' ) or die (); JHtml::addIncludePath ( JPATH_COMPONENT . '/helpers' ); JHtml::_ ( 'behavior.caption' ); ?>

<?php // Seitentitel und Headline ?>
<div id="pageT"><?php echo $this->category->title?></div>
<h1 id="page_title"><?php echo str_replace("</p>", "", str_replace("<p>", "", $this->category->description))?></h1>


<?php // Erster Beitrag ?>
<?php $leadingcount = 0; ?>
<?php if (!empty($this->lead_items)) : ?>
	<?php foreach ($this->lead_items as &$item) : ?>
		<article>
			<?php $this->item = & $item; ?>
			<h2><?php echo $this->item->title ?></h2>
			<?php $text = $this->item->text; echo $text;?>
			<?php $leadingcount++; ?>
		</article>
	<?php endforeach; ?>
<?php endif; ?>

<?php // alle weiteren Beiträge ?>
<?php $introcount = (count ( $this->intro_items )); $counter = 0; ?>
<?php if (!empty($this->intro_items)) : ?>
	<?php foreach ($this->intro_items as $key => &$item) : ?>
		<?php $this->item = & $item; ?>
		<article>
			<a class="anchor" id="<?php echo $this->item->alias ?>"></a>
			<h2><?php echo $this->item->title ?></h2>
			<?php $text = $this->item->text;	echo $text;?>
			<?php $counter++; ?>
	<?php endforeach; ?>
<?php endif; ?>
